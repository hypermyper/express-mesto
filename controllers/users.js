const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(400).send({ message: 'Неправильно введены данные' }));

const getProfile = (req, res) => User.findById(req.params._id)
  .orFail(new Error('IdError'))
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.message === 'IdError') {
      res.status(404).send({ message: 'Такого пользователя в базе нет' });
    } else if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Неправильно введены данные' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные пользователя' }));
};

// update profile data, use userId from app.js
const patchProfile = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode(404);
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Неправильно введены данные' }));
};

// update profile avatar, use userId from app.js
const patchAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode(404);
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Неправильно введены данные' }));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  patchProfile,
  patchAvatar,
};
