const path = require('path');
const getDataFromFile = require('../helpers/files');
const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
    return getDataFromFile(dataPath)
        .then(cards => {
          if (!cards) {
            return res.status(404).send({ message: 'Нет файла с данными'});
          }
          res.status(200).send(cards);
        })
        .catch(err => res.status(400).send(err));
};

module.exports = { getCards };