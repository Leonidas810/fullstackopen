const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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
    return response.status(204).end();
  };
  response.send(persons[indexPerson]);
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const indexPerson = persons.findIndex((p) => p.id === id);
  if (indexPerson === -1) {
    return response.status(204).end();
  };

  const newPersons = [...persons.slice(0, indexPerson), ...persons.slice(indexPerson + 1, persons.length)];
  persons = newPersons;
  response.status(200).send(`User ${id} deletion done successfully`);

})

app.post('/api/persons', (request, response) => {
  const data = request.body;
  if (!data.name || !data.number) {
    return response.status(400).send('Name and number are required');
  }

  if (persons.some((e) => e.name === data.name)) {
    return response.status(400).send(`This name ${data.name} is already taken`);
  }

  const id = (persons.length + 1).toString();
  const person = { id, ...data }; persons.push(person);
  response.status(201).send(person);
})

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`
  )
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})