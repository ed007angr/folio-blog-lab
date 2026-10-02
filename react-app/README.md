# Folio — React и Redux Toolkit

Лабораторная №22: редакционный блог с фильтром по тегам. Активный тег и коллекция статей лежат в хранилище Redux Toolkit. Фильтр и список не передают тег друг другу через props.

## Запуск

```bash
cd react-app
npm install
npm run dev
```

Адрес обычно http://localhost:5173. Если порт 5173 занят, Vite выберет следующий свободный и напечатает его в терминале.

Сборка без dev-сервера:

```bash
npm run build
```

## Хранилище

Каталог `src/store`.

- `filterSlice` хранит активный тег (`activeTag`). Значение `null` означает «Все». Экшен `setTag` меняет тег.
- `articlesSlice` хранит коллекцию статей: `id`, `title`, `author`, `previewText`, `imageUrl`, `tags`. Список не лежит в локальном `useState`.
- `configureStore` собирает оба среза. Корень приложения обёрнут в `<Provider store={store}>`.

`TagFilter` читает активный тег через `useSelector` и отправляет `setTag` через `useDispatch`. `ArticleList` через `useSelector` читает статьи и активный тег и оставляет только совпадения. Если совпадений нет, показывается короткая пустая заглушка.
