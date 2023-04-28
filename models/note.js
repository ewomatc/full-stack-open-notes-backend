const mongoose = require('mongoose')
require('dotenv').config()


const url = process.env.MONGODB_URI
console.log(`connecting to ----- `, url);


mongoose.set('strictQuery',false)
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {console.log('connection to database successful')})
  .catch(err => console.log('error connecting to db ------ ', err.message))


const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJson', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)