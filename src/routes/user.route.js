const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const { checkLogin, checkRegister } = require('../middleware/user.middleware')
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

module.exports = router