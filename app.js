require('dotenv').config()
require('./db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')

const { noteRoutes, userRoutes } = require('./src/routes/index')

const app = express()

const allowedOrigins = [
  'http://localhost:8080',
  'https://keeper-2c245.web.app',
  'https://keeper-2c245.firebaseapp.com'
]

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', userRoutes)
app.use('/', noteRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log('Server successfully started!')
})