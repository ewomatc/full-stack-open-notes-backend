const http = require('http')
const express = require('express')

const app = express()


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  console.log('Request made for homepage')
  res.send('<h1>Hello Saturn<h1>')
})

app.get('/api/notes', (req, res) => {
  console.log('requesting notes')
  res.json(notes)
})

//fetching a single resource
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)

  const note = notes.find(note => note.id === id )
//here we check if the requested id exists and send an appropriate response
  if(note) {
    res.json(note)
    console.log(`request made for note: ${note.id}`);
  } else {
    res.status(404).end()
  }
})

//delete a note
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  console.log('Data deleted successfully');
  res.status(204).end()
})













const PORT = 3001;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})