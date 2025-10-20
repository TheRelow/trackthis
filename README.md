# TrackThis — исходники расширения

Это шаблон расширения Firefox/Chrome на Vite + Vue 3 + TypeScript + SCSS
Фичи:
- <script setup lang="ts"> во Vue компонентах
- хранение прочитанных страниц в browser.storage.local
- timestamp в unix (секунды)
- pnpm в качестве менеджера пакетов (указано в инструкциях)

## Быстрый старт

1. Установить pnpm, если ещё не установлен:
   ```bash
   npm install -g pnpm
   ```
2. Установить зависимости:
   ```bash
   pnpm install
   ```
3. Сборка:
   ```bash
   pnpm build
   ```
4. В Firefox открыть `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → выбрать `dist/manifest.json`

## Примечание
- Положи свой логотип в `public/icon.png`
- В `public/manifest.json` можно изменить поля name/description/version
