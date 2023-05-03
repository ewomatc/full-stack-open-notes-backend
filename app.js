//everything that has to do with connecting to the database is now assigned to this app.js file.

const config = require('./utils/config.js')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware.js')
const notesRouter = require('./controllers/notes.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')

logger.info(`connecting to ----- `, config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    logger.info('connected to Mongodb')
  })
  .catch((err) => {
    logger.error('error connecting to Mongodb', err.message)
  })


app.use(express.json())

app.use('/api/notes', notesRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app