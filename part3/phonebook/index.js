const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get("/api/persons", (request, response) => {
  response.send(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const indexPerson = persons.findIndex((p) => p.id === id)
  if (indexPerson === -1) {
    response.status(204).end();
  } else {
    response.send(persons[indexPerson]);
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const indexPerson = persons.findIndex((p) => p.id === id);
  if (indexPerson === -1) {
    response.status(204);
  } else {
    const newPersons = [...persons.slice(0, indexPerson), ...persons.slice(indexPerson + 1, persons.length)];
    persons = newPersons;
    response.status(200).send(`User ${id} deletion done successfully`);
  }
})

app.post('/api/persons', (request, response) => {
  const id = persons.length+1;
  const person = { id: id.toString(), ...request.body };
  response.send(person);
})

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})