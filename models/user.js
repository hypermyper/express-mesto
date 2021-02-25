const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const link = /https?:\/\/(w*\.)?[\d\w\-._~:/\\?#[\]@!$&'()*+,;=]{2,}#?/.test(v);
        return link;
      },
      message: 'Неправильный url для изображения',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
