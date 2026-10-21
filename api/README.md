# Folio API

REST API статей блога Folio. Стек: Node.js, Express, Mongoose, MongoDB.

## Установка и запуск

Нужны Node.js и запущенный MongoDB (локальная служба или Atlas).

```bash
cd api
npm install
copy .env.example .env
npm run dev
```

На Windows строку подключения можно скопировать так: `copy .env.example .env`. Сервер читает `PORT` и `MONGODB_URI` из `.env`. По умолчанию это `http://localhost:4000` и база `folio` на `127.0.0.1:27017`.

Production-запуск без nodemon:

```bash
npm start
```

## Эндпоинты

| Метод | URL | Назначение |
| --- | --- | --- |
| GET | `/api/articles` | список статей |
| GET | `/api/articles/:id` | одна статья |
| POST | `/api/articles` | создать статью |
| PUT | `/api/articles/:id` | обновить статью |
| DELETE | `/api/articles/:id` | удалить статью |

Тело создания:

```json
{
  "title": "Утренние страницы",
  "content": "Три страницы от руки до завтрака.",
  "author": "Анна Волкова"
}
```

Поля `title` и `content` обязательны.

Проверка всех CRUD-запросов из терминала, без окна Postman:

```bash
npx newman run postman/folio-articles.postman_collection.json
```

Newman выполняет коллекцию `postman/folio-articles.postman_collection.json`: создание, список, чтение, обновление и удаление. В прогоне от 21 октября 2026 все пять запросов завершились без ошибок.
