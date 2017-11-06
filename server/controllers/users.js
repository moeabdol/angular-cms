const User = require('../models/user');

const signup = (req, res, next) => {
  if (!req.body.username) return res.status(422).json({
    message: 'Username is required!'
  });

  if (!req.body.password) return res.status(422).json({
    message: 'Password is required!'
  });

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) return res.status(409).json({
        message: 'User already exists!'
      });

      const newUser = new User();
      newUser.username = req.body.username;
      newUser.password = req.body.password;

      newUser.save()
        .then(() => res.status(201).json({
          user: { username: newUser.username }
        }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

const signin = (req, res, next) => {
  if (!req.body.username) return res.status(422).json({
    message: 'Username is required!'
  });

  if (!req.body.password) return res.status(422).json({
    message: 'Password is required!'
  });

  User.findOne({ username: req.body.username, password: req.body.password })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found!' });
      res.status(200).json({ user: { username: user.username } });
    })
    .catch(err => next(err));
};

module.exports = {
  signup,
  signin
};
