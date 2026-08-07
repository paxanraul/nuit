import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
for (const [width, height] of [[390, 844], [1440, 900]]) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto("http://127.0.0.1:3111", { waitUntil: "networkidle0" });
  for (const [name, selector] of [
    ["collection", "#collection-title"],
    ["gallery", "#campaign-title"],
  ]) {
    await page.$eval(selector, (element) => element.scrollIntoView({ block: "start" }));
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await page.screenshot({ path: `.qa/section-${name}-${width}.png` });
  }
}

for (const [name, route, width, height] of [
  ["catalog", "/magazin", 390, 844],
  ["product", "/magazin/two-strangers-black", 1440, 900],
]) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:3111${route}`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: `.qa/route-${name}-${width}.png`, fullPage: false });
}

await browser.close();
