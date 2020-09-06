require('dotenv').config()
require('./db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')

const { noteRoutes, userRoutes } = require('./src/routes/index')

const app = express()

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', userRoutes)
app.use('/', noteRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log('Server successfully started!')
})