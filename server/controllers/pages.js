const Page  = require('../models/page');

const index = (req, res, next) => {
  Page.find()
    .then(pages => res.status(200).json(pages))
    .catch(err => next(err));
};

module.exports = {
  index
};
