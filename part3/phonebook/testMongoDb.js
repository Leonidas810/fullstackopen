require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose.connect(process.env.MONGOURL)
  .then(() => {
    console.log('Connected to MongoDB')
    const note = new Note({
      content: 'HTML is easy',
      important: true,
    })

    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error:', err)
  })
