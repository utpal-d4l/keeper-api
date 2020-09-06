const bcrypt = require('bcrypt')

const User = require('../models/user.model')

function findUser(params) {
  return new Promise((resolve, reject) => {
    User.findOne(params)
      .then(user => resolve(user))
      .catch(e => reject(e))
  })
}

function checkRegister(req, res, next) {
  findUser({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.status(403).send('User already registered. Try login or register with a different username!')
      } else {
        next()
      }
    })
    .catch(e => next(e))
}

function checkLogin(req, res, next) {
  findUser({ username: req.body.username })
    .then((user) => {
      if (user) {
        user.checkPassword(req.body.password)
          .then((isCorrect) => {
            if (isCorrect) {
              next()
            } else {
              res.status(401).send('Incorrect Password.')
            }
          })
      } else {
        res.status(403).send('User is not registered. Sign up to continue!')
      }
    })
    .catch(e => next(e))
}

module.exports = {
  checkLogin,
  checkRegister
}