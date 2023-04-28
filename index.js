require('dotenv').config()
const express = require('express')
const Note = require('./models/note.js')

const app = express()
app.use(express.json())

//fetch all notes
app.get('/api/notes', (req, res) => {
  Note.find().then(notes => {
    res.json(notes)
    console.log('request made for notes')
  })
})

//fetching a single note by id
app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if(note) {
        res.json(note)
      } else{
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

//add a note with POST
app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if(body.content === undefined) {
    res.status(400).json({error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save()
    .then((savedNote) => {
      res.json(savedNote)
    })
    .catch((err) => next(err))
})

//delete a single note by id
app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    }).catch(err => next(err))
})

//updating a note with PUT
app.put('/api/notes/:id', (req, res, next) => {
  const {content, important} = req.body


  Note.findByIdAndUpdate(req.params.id, {content, important}, {new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {res.json(updatedNote)})
    .catch(err => next(err))
})

//middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'Unknown Endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if(err.name === 'CastError') {
    res.status(400).send({error: 'malformatted id'})
  } else if(err.name === 'ValidationError') {
    res.status(400).json({error: err.message})
  }
  next(err)
}
app.use(errorHandler)



const PORT = process.env.PORT;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})