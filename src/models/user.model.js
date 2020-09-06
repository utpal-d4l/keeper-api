const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.methods.checkPassword = function (password) {
  return new Promise((resolve) => {
    bcrypt.compare(password, this.password, (err, res) => {
      if (err) {
        resolve(false)
      }
      resolve(res)
    })
  })
}

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, Number(process.env.SALT_ROUNDS), (err, hashedPassword) => {
    if (err) {
      next(err)
    }
    this.password = hashedPassword
    next()
  })
})

module.exports = mongoose.model('User', userSchema)