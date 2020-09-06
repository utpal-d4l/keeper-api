const express = require('express')
const router = express.Router()

const  Note = require('../models/note.model')
const { authorizeRequest } = require('../middleware/auth.middleware')

router.get('/getNotes', authorizeRequest, (req, res) => {
  Note.find({ user: req.username })
    .then(notes => res.status(200).send(notes))
    .catch(_e => res.status(500).send('Internal Server Error!'))
})

router.post('/createNote', authorizeRequest, (req, res) => {
  const note = new Note({ ...req.body, user: req.username })

  note.save()
    .then(() => res.status(201).send(note))
    .catch(_e => res.status(500).send('Internal Server Error!'))
})

router.post('/deleteNote', authorizeRequest, (req, res) => {
  Note.deleteOne({ _id: req.body.id })
    .then(({ n }) => {
      if (n === 1) {
        res.status(200).send('Sucess!')
      } else {
        res.status(500).send('Internal Server Error!')
      }
    })
    .catch(_e => res.status(500).send('Internal Server Error!'))
})

router.post('/updateNote', authorizeRequest, (req, res) => {
  Note.updateOne({ _id: req.body.id }, req.body.update)
    .then(({ n }) => {
      if (n === 1) {
        res.status(200).send('Sucess!')
      } else {
        res.status(500).send('Internal Server Error!')
      }
    })
    .catch(_e => res.status(500).send('Internal Server Error!'))
})

module.exports = router