const { createPerson, getAllPersons, deletePerson, getOnePerson, updatePerson, countPerson } = require('./controllers/personController')
const errorHandler = require('./middleware/errorHandler')

require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => { return req.method === 'POST' ? JSON.stringify(req.body) : ''; });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("Connected"))
  .catch((err) => console.log(`Error: ${err}`))

app.get('/info', async (_, res, next) => {
  try {
    const date = new Date();
    const count = await countPerson();
    res.json({ numberOfPersons: count, date: date })
  } catch (err) {
    return next(err)
  }
})

app.get("/api/persons", async (_, res, next) => {
  try {
    const persons = await getAllPersons();
    res.json(persons);
  } catch (err) {
    return next(err);
  }
});

app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body;
    if (!name || !number) throw Error("Name and number are required")
    const person = { name, number };
    const savedPerson = await createPerson(person);
    res.json(savedPerson);
  } catch (err) {
    return next(err);
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await getOnePerson(id);
    if (!person) throw Error("The person does not exist");
    res.json(person);
  } catch (err) {
    return next(err);
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPerson = await deletePerson(id);
    if (!deletedPerson) throw Error("The person does not exist")
    res.json(deletedPerson);
  } catch (err) {
    return next(err);
  }
})

app.put('/api/persons', async (req, res, next) => {
  try {
    const { id, name, number } = req.body;
    if(!id) throw Error ("Id is requerided");
    const personData = { name, number };
    const updatedPerson = await updatePerson(id, personData);
    res.json(updatedPerson);
  } catch (err) {
    return next(err);
  }
})

// Unknown endpoint
app.use((_, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})