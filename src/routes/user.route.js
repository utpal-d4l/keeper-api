const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const { checkLogin, checkRegister, findUser } = require('../middleware/user.middleware')
const { authorizeRequest, clearCookie, setCookie } = require('../middleware/auth.middleware')

router.post('/register', checkRegister, (req, res, next) => {
  const user = new User(req.body)

  user.save()
    .then(() => next())
    .catch(_e => res.status(500).send('Internal Server Error!'))
},
  setCookie
)

router.post('/login', checkLogin, setCookie)

router.get('/logout', clearCookie)

router.get('/checkToken', authorizeRequest, (req, res) => {
  res.status(200).send('Success!')
})

router.post('/checkExistingUser', (req, res) => {
  findUser({ username: req.body.username})
    .then((user) => {
      if (user) {
        res.status(200).send('Exist')
      } else {
        res.status(200).send('Does not Exist')
      }
    })
    .catch(_e => res.status(500).send('Internal Server Error!'))
})

module.exports = router