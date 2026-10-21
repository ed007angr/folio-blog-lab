const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const articlesRouter = require('./routes/articles');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

app.use(express.json());
app.use('/api/articles', articlesRouter);

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400) {
    return res.status(400).json({ message: 'Некорректный JSON' });
  }
  res.status(500).json({ message: error.message || 'Ошибка сервера' });
});

async function start() {
  if (!mongoUri) {
    throw new Error('В .env не задана переменная MONGODB_URI');
  }
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`API слушает http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
