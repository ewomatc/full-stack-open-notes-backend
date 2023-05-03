//in this file we have moved all our custom middlewares. and also exported them to other files they're needed.
/* 
const logger = require('./logger.js')

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint, page not found'})
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if(err.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  } else if(err.name === 'ValidationError') {
    return res.status(400).json(err.message)
  }

  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler
} */
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}