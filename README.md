# Folio

Редакционный блог. На ветке `angular` приложение собрано на **Angular** (каталог `my-app`). На ветке `main` лежит прототип на Vue 3.

## Angular

Нужны Node.js 18+ и npm.

```bash
cd my-app
npm install
npm start
```

Приложение откроется по адресу http://localhost:4200/.

Сборка production-версии: `npm run build` в каталоге `my-app`. Результат — `my-app/dist/my-app`.

Состав:

| Сущность | Назначение |
| --- | --- |
| `AppModule` | объявляет компоненты и запускает приложение |
| `HeaderComponent` | шапка с логотипом Folio |
| `ArticleListComponent` | получает статьи из сервиса и рисует ленту через `*ngFor` |
| `ArticleCardComponent` | одна карточка, данные приходят через `@Input() article` |
| `ArticlesService` | метод `getData()` возвращает mock-массив статей |

## Vue

Прототип на **Vue 3**, **Vite** и **JSX** остаётся в корне репозитория.

## Запуск Vue

Из корня репозитория:

```bash
npm install
npm run dev
```

Приложение откроется по адресу, который выведет Vite (обычно `http://localhost:5173`).

Сборка production-версии:

```bash
npm run build
npm run preview
```

## Компоненты

Все компоненты — функциональные (`defineComponent` + `setup`, без классов). Состояние только через хук `useState` в `src/hooks/useState.js`.

| Компонент | Назначение | Props | Локальное состояние |
| --- | --- | --- | --- |
| `LikeButton` | кнопка лайка со счётчиком | `initialCount` | `likes` — увеличивается по клику |
| `CommentInput` | поле комментария и кнопка Post | `placeholder` | `text`, `focused`, список отправленных комментариев |
| `ArticleCard` | карточка статьи | `title`, `excerpt`, `author`, `date`, `readTime`, `image`, `imageAlt`, `likes`, `comments` | нет: данные приходят через props |
| `Avatar` | круглая заглушка аватара | `size` (32 / 48 / 64), `src`, `alt` | нет |
| `PostButton` | кнопка отправки | `disabled`, `label` | нет |

## Ограничения лабораторной

- классовые компоненты не используются;
- Redux, MobX, Zustand и аналоги не подключены.

## Отчёт

PDF-отчёт лабораторной по Angular: [`report-lab20/explanatory_note.pdf`](report-lab20/explanatory_note.pdf).

PDF-отчёт прототипа на Vue: [`report-lab2/explanatory_note.pdf`](report-lab2/explanatory_note.pdf).

## Репозиторий

https://github.com/ed007angr/folio-blog-lab
