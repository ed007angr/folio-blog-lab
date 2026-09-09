# Folio

Редакционный блог на **Vue 3**, **Vite** и **JSX**. Компоненты собраны по UI-киту Folio: карточка статьи, кнопка лайка, поле комментария и аватар.

## Запуск

Нужны Node.js 18+ и npm.

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

PDF-отчёт лабораторной: [`report-lab2/explanatory_note.pdf`](report-lab2/explanatory_note.pdf).

## Репозиторий

https://github.com/ed007angr/folio-blog-lab
