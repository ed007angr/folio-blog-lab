# Folio

Редакционный блог на **Vue 3** и **Vite** (лабораторная №21). Корневое приложение собрано из однофайловых компонентов на Options API. Состояние живёт в `data()` каждого компонента. Vuex, Pinia и другие библиотеки состояния не используются.

Приложение Angular той же темы лежит отдельно в каталоге `my-app`.

## Запуск Vue

Из корня репозитория:

```bash
npm install
npm run dev
```

Vite печатает локальный адрес в терминале. Обычно это http://localhost:5173.

Сборка без dev-сервера:

```bash
npm run build
```

## Компоненты Vue

Родитель `App.vue` показывает шапку, ленту и обсуждение. Список комментариев хранится в `data()` корня и передаётся вниз через props. Новый текст приходит обратно через `$emit` и сразу появляется в списке.

| Компонент | Назначение | Props | Событие наверх | Локальное состояние |
| --- | --- | --- | --- | --- |
| `ArticleCard.vue` | карточка статьи и кнопка Like со счётчиком | `article` — `Object`, `required` | `$emit('like', articleId)` по `@click` | `likes`, `liked` в `data()` |
| `ArticleList.vue` | коллекция статей, `v-for` с `:key` | передаёт объект статьи в карточку | слушает `like` и показывает заголовок отмеченного материала | `articles`, `lastReaction` в `data()` |
| `CommentSection.vue` | форма с `v-model` и список комментариев | `comments` — `Array`, `required` | `$emit('add-comment', text)` | `draft`, `focused` в `data()` |

Пустой текст комментария и пустой список разбираются через `v-if` / `v-else`.

## Angular

Лабораторная на Angular остаётся в `my-app`:

```bash
cd my-app
npm install
npm start
```

Приложение откроется по адресу http://localhost:4200.

## React

Лабораторная №22 лежит в каталоге `react-app`: тот же блог Folio, фильтр тегов на Redux Toolkit. Активный тег и список статей хранятся в `src/store`, компоненты читают их через `useSelector` и `useDispatch`.

```bash
cd react-app
npm install
npm run dev
```

Адрес обычно http://localhost:5173. Если порт занят, Vite выберет следующий свободный и напечатает его в терминале.

## Nuxt

Лабораторная №25 лежит в каталоге `nuxt-app`. Главная страница рендерится на сервере, страницы статей собраны статически.

```bash
cd nuxt-app
npm install --legacy-peer-deps
npm run build
npm run start
```

Приложение откроется по адресу http://localhost:3000. Подробности — в [`nuxt-app/README.md`](nuxt-app/README.md).

## API

Лабораторная №28 — REST API статей в каталоге `api` (Express, Mongoose, MongoDB). Нужна запущенная локальная MongoDB.

```bash
cd api
npm install
copy .env.example .env
npm run dev
```

Сервер откроется по адресу http://localhost:4000. Эндпоинты: `/api/articles`. Подробности — в [`api/README.md`](api/README.md).

## Лабораторная №23 — Bootstrap

Корневое Vue-приложение стилизовано одной библиотекой **bootstrap-vue-next** (Bootstrap 5). Vuetify и другие UI-наборы не подключены. Плагин регистрируется в `src/main.js` через `createBootstrap()`.

Запуск из корня репозитория:

```bash
npm install
npm run dev
```

Лента статей — сетка Bootstrap: `BContainer`, `BRow`, `BCol`. На широком экране (`lg`) карточки стоят в 3 колонки, на планшете (`md`) — в 2, на телефоне (`cols="12"`) — в 1. Кнопки, карточки статей и поле комментария заменены на `BButton`, `BCard` и `BFormTextarea`. Счётчик Like, `v-model` комментария, список через `v-for` и пустое состояние через `v-if` / `v-else` сохранены. Состояние по-прежнему в `data()`, без Pinia и Vuex.

## Отчёт

PDF лабораторной №21: [`report-lab21/explanatory_note.pdf`](report-lab21/explanatory_note.pdf).

PDF лабораторной №22: [`report-lab22/explanatory_note.pdf`](report-lab22/explanatory_note.pdf).

PDF лабораторной №23: [`report-lab23/explanatory_note.pdf`](report-lab23/explanatory_note.pdf).

PDF лабораторной №25: [`report-lab25/explanatory_note.pdf`](report-lab25/explanatory_note.pdf).

PDF лабораторной №28: [`report-lab28/explanatory_note.pdf`](report-lab28/explanatory_note.pdf).

## Репозиторий

https://github.com/ed007angr/folio-blog-lab
