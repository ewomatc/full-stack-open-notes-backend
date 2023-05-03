//this notes.js file handles all routes related to notes. The route handlers are commonly called controllers which is why it is in a controllers directory.

const notesRouter = require('express').Router()
const Note = require('../models/note.js')


//route handler to get all notes
notesRouter.get('/', (req, res) => {
  Note.find().then(notes => {
    res.json(notes)
    console.log('request made for notes')
  })
  .catch(err => next(err))
})

//route handler to get a single note by it's id
notesRouter.get('/:id', (req, res, next) => {
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

//route handler to add a note with POST
notesRouter.post('/', (req, res, next) => {
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

//route handler to delete a single note by id
notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    }).catch(err => next(err))
})

//route handler for updating a note by id

//instead of writing the req,body variable as: 'const body = req.body'. We pass it in as '{ content, important }. This way our express error handler middleware is able to catch errors in the '.catch(err => next(err))'

//this is because the validationError only works directly in POST requests.
notesRouter.put('/:id', (req, res, next) => {
  const {content, important} = req.body


  Note.findByIdAndUpdate(req.params.id, {content, important}, {new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {res.json(updatedNote)})
    .catch(err => next(err))
})

module.exports = notesRouter