import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";

const base = process.env.NUIT_BASE_URL ?? "http://127.0.0.1:3111";
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const routes = ["/", "/magazin", "/magazin/two-strangers-black"];
const failures = [];
const report = [];

async function revealFullPage(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(window.innerHeight * 0.75, 320)) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((resolve) => setTimeout(resolve, 300));
}

await mkdir(".qa", { recursive: true });
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => consoleErrors.push(error.message));

for (const width of widths) {
  const height = width < 768 ? 844 : 900;
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await revealFullPage(page);
  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    language: document.documentElement.lang,
    emptyButtons: [...document.querySelectorAll("button")].filter((button) => !button.textContent?.trim() && !button.getAttribute("aria-label")).length,
    imagesWithoutAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).length,
  }));
  report.push({ width, route: "/", ...metrics });
  if (metrics.overflow > 1) failures.push(`Горизонтальный overflow ${metrics.overflow}px на ${width}px`);
  if (metrics.language !== "ru") failures.push(`Неверный lang на ${width}px`);
  if (metrics.emptyButtons > 0) failures.push(`Кнопки без имени на ${width}px: ${metrics.emptyButtons}`);
  if (metrics.imagesWithoutAlt > 0) failures.push(`Изображения без alt на ${width}px: ${metrics.imagesWithoutAlt}`);
  if ([320, 390, 768, 1440, 1920].includes(width)) {
    await page.screenshot({ path: `.qa/home-${width}.png`, fullPage: true });
  }
}

for (const width of [390, 1440]) {
  await page.setViewport({ width, height: width < 768 ? 844 : 900, deviceScaleFactor: 1 });
  for (const route of routes) {
    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle0" });
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      h1: document.querySelectorAll("h1").length,
      main: document.querySelectorAll("main").length,
    }));
    report.push({ width, route, status: response?.status(), ...state });
    if (![200, 304].includes(response?.status() ?? 0)) failures.push(`${route} вернул ${response?.status()} на ${width}px`);
    if (state.overflow > 1) failures.push(`Горизонтальный overflow ${state.overflow}px: ${route} на ${width}px`);
    if (state.h1 !== 1) failures.push(`Ожидался один H1: ${route}, найдено ${state.h1}`);
    if (state.main !== 1) failures.push(`Ожидался один main: ${route}, найдено ${state.main}`);
  }
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto(base, { waitUntil: "networkidle0" });
const collectionLink = await page.$eval('header a[href="/magazin"]', (link) => link.textContent?.trim());
if (collectionLink !== "Коллекция") failures.push("В шапке отсутствует ссылка на коллекцию");

await page.goto(`${base}/magazin/two-strangers-black`, { waitUntil: "networkidle0" });
const productText = await page.$eval("main", (element) => element.textContent ?? "");
const normalizedProductText = productText.replace(/\s+/g, " ");
if (!normalizedProductText.includes("Two Strangers") || !normalizedProductText.includes("6 900")) failures.push("Страница модели не содержит название или цену");
await page.screenshot({ path: ".qa/product-mobile-390.png", fullPage: false });

if (consoleErrors.length > 0) failures.push(`Ошибки консоли: ${[...new Set(consoleErrors)].join(" | ")}`);
await browser.close();

console.log(JSON.stringify({ ok: failures.length === 0, failures, checks: report.length, report }, null, 2));
if (failures.length > 0) process.exitCode = 1;
