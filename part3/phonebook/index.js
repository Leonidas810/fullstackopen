const { createPerson, getAllPersons, deletePerson, getOnePerson } = require('./controllers/personController')

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

app.get("/api/persons", async (_, res) => {
  try {
    const persons = await getAllPersons();
    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/persons/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const person = await getOnePerson(id);
    if (!person) res.status(404).end();
    res.json(person);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.delete('/api/persons/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPerson = await deletePerson(id);
    if (!deletedPerson) res.status(404).end();
    res.json({ message: `User ${deletedPerson.name} deletion done successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.post('/api/persons', async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.number) throw Error("Name and number are required")
    const person = { name: data.name, number: data.number };
    const savedPerson = await createPerson(person);
    res.json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get('/info', (_, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`
  )
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})