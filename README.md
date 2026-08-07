# NUIT

Лёгкий презентационный сайт коллекции NUIT на Next.js.

## Локальный запуск

```bash
npm ci
npm run dev
```

## Публикация на GitHub Pages

Проект уже настроен на статический экспорт и автоматически публикуется workflow-файлом `.github/workflows/deploy-pages.yml` после пуша в ветку `main`.

1. Запушите изменения в GitHub.
2. Откройте `Settings → Pages` в репозитории.
3. В поле `Source` выберите `GitHub Actions`.
4. Дождитесь завершения workflow `Deploy NUIT to GitHub Pages` во вкладке `Actions`.

Для репозитория `paxanraul/nuit` адрес сайта будет: <https://paxanraul.github.io/nuit/>.
