# Unity Test MF (Remote)

Vue 3 + Vite Module Federation remote для экспорта `./Widget`.

## Что экспортируется

- Remote name: `unity_test_mf`
- Expose: `./Widget` -> `src/Widget.vue`
- Remote entry: `remoteEntry.js`
- Версия приложения инжектится как `__APP_VERSION__` из `package.json`

`Widget` логирует в консоль при маунте:

```ts
console.log('Unity Test MF Widget loaded', { version: __APP_VERSION__ })
```

## Требования

- Node.js `20+`
- npm `9+` (рекомендуется)

## Локальная разработка

Установка зависимостей:

```bash
npm install
```

Запуск dev-режима:

```bash
npm run dev
```

Это поднимает Vite dev server для разработки `src/Widget.vue`.

## Локальная проверка build-артефактов

Сборка:

```bash
npm run build
```

Проверка результата:

- `dist/remoteEntry.js` должен существовать
- чанки/ассеты должны быть в `dist/assets/*`

Локальный просмотр собранной версии:

```bash
npm run preview
```

## Как тестить интеграцию с host локально

Host должен указывать remote entry на локальный URL remote-репозитория.

Пример URL:

```text
http://localhost:8787/unity-test-mf/remoteEntry.js
```

Если вы тестируете без Worker, можно использовать URL preview/dev сервера этого репозитория и путь до `remoteEntry.js`.

## Production CI/CD

Workflow: `.github/workflows/release.yml`

На каждый push в `main`:

1. Ставит зависимости (`npm ci`)
2. Делает patch bump версии:
   - `npm version patch -m "chore(release): v%s [skip ci]"`
3. Пушит commit + tag (`vX.Y.Z`) обратно в `main`
4. Собирает проект (`npm run build`)
5. Проверяет наличие `dist/remoteEntry.js`
6. Загружает весь `dist/` в Cloudflare R2 префикс `unity-test-mf/`

## GitHub Secrets

Обязательные secrets:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`

Префикс загрузки задан в workflow как:

- `R2_PREFIX: unity-test-mf/`

Итоговый production путь remote entry:

```text
/unity-test-mf/remoteEntry.js
```

## Диагностика

`dist/remoteEntry.js not found` в CI:

- Проверьте, что сборка выполняется через текущий `vite.config.ts`
- Проверьте, что `@originjs/vite-plugin-federation` установлен

`fatal: could not read Username for 'https://github.com'`:

- В workflow уже используется `GITHUB_TOKEN` для push
- Проверьте в GitHub repo settings: Actions permissions должны быть `Read and write`

`Top-level await is not available`:

- Build target должен быть `es2022` или выше (уже настроено)
