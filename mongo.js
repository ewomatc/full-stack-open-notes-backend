const mongoose = require('mongoose')


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://noteuser01:${password}@fso-notes.wuyfij4.mongodb.net/noteApp?retryWrites=true&w=majority`


mongoose.set('strictQuery',false)
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
  console.log('connected to database');
}) .catch((err) => {
  console.log('error connecting to db', err);
})

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
/* 
const note = new Note({
  content: 'HTML is Easy',
  important: true,
}) */
Note.find()
  .then((result) => {
    console.log(result);
    mongoose.connection.close()
  })