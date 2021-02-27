const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Неправильно введены данные' });
        return;
      }
      res.status(500).send({ message: err.name });
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params._id)
  .orFail(new Error('IdError'))
  .then(() => res.status(200).send({ message: 'Карточка удалена' }))
  .catch((err) => {
    if (err.message === 'IdError') {
      res.status(404).send({ message: 'Такой карточки в базе нет' });
    } else if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Неправильно введены данные' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  });

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('IdError'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.message === 'IdError') {
      res.status(404).send({ message: 'Такой карточки в базе нет' });
    } else if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Неправильно введены данные' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('IdError'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.message === 'IdError') {
      res.status(404).send({ message: 'Такой карточки в базе нет' });
    } else if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Неправильно введены данные' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
