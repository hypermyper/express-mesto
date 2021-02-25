const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

const getProfile = (req, res) => User.findById(req.params._id)
  .orFail(() => {
    const err = new Error('Пользователь не найден');
    err.statusCode(404);
    throw err;
  })
  .then((user) => res.status(200).send(user))
  .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }));

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
    .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }));
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
    .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  patchProfile,
  patchAvatar,
};
