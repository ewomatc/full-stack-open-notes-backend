//started separating concerns in this project. This file now handles logging to console. Either logs a normal message or an error message.

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }