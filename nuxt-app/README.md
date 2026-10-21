# Folio на Nuxt

Блог Folio, перенесённый с Vue на **Nuxt 3**. Главная страница (`/`) рендерится на сервере при каждом запросе. Страницы статей (`/posts/[slug]`) генерируются статически во время сборки.

## Сборка и запуск

Нужны Node.js 18+ и npm. Команды выполняются из каталога `nuxt-app`.

```bash
cd nuxt-app
npm install --legacy-peer-deps
npm run build
npm run start
```

Флаг `--legacy-peer-deps` нужен, если обычный `npm install` падает с ошибкой `edgesOut` в arborist.

Приложение откроется по адресу http://localhost:3000.

Режим разработки, без production-сборки:

```bash
npm run dev
```

## Страницы

| Маршрут | Стратегия | Откуда данные |
| --- | --- | --- |
| `/` | SSR, `useAsyncData` при каждом запросе | mock-статьи и текущее время сервера |
| `/posts/morning-pages` | SSG, prerender при `npm run build` | mock-данные на этапе сборки |
| `/posts/when-you-dont-want-to-write` | SSG | то же |
| `/posts/editing-aloud` | SSG | то же |

Переходы между страницами идут через `NuxtLink`.

Чтобы убедиться, что HTML приходит с сервера, откройте исходный код страницы в браузере (View Page Source). На главной время в строке «Сгенерировано на сервере» меняется после обновления. На странице статьи время «HTML собран при сборке» остаётся тем же, пока проект не пересобран.
