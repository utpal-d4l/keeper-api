const jwt = require('jsonwebtoken')

function setCookie(req, res) {
  const payload = { username: req.body.username }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.cookie('token', token, { httpOnly: true, sameSite: true, secure: true }).status(200).send('Success!')
}

function authorizeRequest(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    res.status(401).send('Unauthorized, No token provided!')
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send('Unauthorized, Invalid token!')
      } else {
        req.username = decode.username
        next()
      }
    })
  }
}

function clearCookie(req, res) {
  res.clearCookie('token')
  res.status(200).send('Success!')
}

module.exports = {
  authorizeRequest,
  setCookie,
  clearCookie
}