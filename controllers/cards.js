const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params._id)
  .orFail(() => {
    const err = new Error('Карточка не найдена');
    err.statusCode(404);
    throw err;
  })
  .then(() => res.status(200).send({ message: 'Карточка удалена' }))
  .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    const err = new Error('Карточка не найдена');
    err.statusCode(404);
    throw err;
  })
  .then((card) => res.status(200).send(card))
  .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    const err = new Error('Карточка не найдена');
    err.statusCode(404);
    throw err;
  })
  .then((card) => res.status(200).send(card))
  .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
