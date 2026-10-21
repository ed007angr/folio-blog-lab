const mongoose = require('mongoose');
const Article = require('../models/Article');

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function sendError(res, error) {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Ошибка сервера' });
}

async function getArticles(_req, res) {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    sendError(res, error);
  }
}

async function getArticle(req, res) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Некорректный идентификатор' });
    }
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.status(200).json(article);
  } catch (error) {
    sendError(res, error);
  }
}

async function createArticle(req, res) {
  try {
    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    res.status(201).json(article);
  } catch (error) {
    sendError(res, error);
  }
}

async function updateArticle(req, res) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Некорректный идентификатор' });
    }
    const updates = {};
    for (const field of ['title', 'content', 'author']) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Нет полей для обновления' });
    }
    const article = await Article.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.status(200).json(article);
  } catch (error) {
    sendError(res, error);
  }
}

async function deleteArticle(req, res) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Некорректный идентификатор' });
    }
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.status(200).json({ message: 'Статья удалена', article });
  } catch (error) {
    sendError(res, error);
  }
}

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
