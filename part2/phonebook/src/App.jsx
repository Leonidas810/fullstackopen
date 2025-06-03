import { useState } from 'react'
import Filter from './components/filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [personsFilter, setPersonsFilter] = useState({
    filter: "",
    persons: persons
  });

  const [newName, setNewName] = useState({
    name: "",
    number: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setPersons((prevState) => {
      const hasPerson = prevState.some((e) => e.name === newName.name);
      if (hasPerson) {
        alert(`${newName} is already added to phonebook`);
        return prevState;
      } else {
        return prevState.concat({ name: newName.name, number: newName.number, id: prevState.length + 1 });
      }
    });
    setPersonsFilter({
      filter: "",
      persons: persons
    })
  }


  const handleOnChangeInput = (e) => {
    e.preventDefault();
    const inputType = e.target.dataset.input;
    setNewName((prevState) => {
      return inputType === "name"
        ? { ...prevState, name: e.target.value }
        : { ...prevState, number: e.target.value }
    });
  }

  const handleOnChangeFilter = (e) => {
    e.preventDefault();
    const re = new RegExp(`^${e.target.value}`, "i");
    setPersonsFilter({ filter: e.target.value, persons: persons.filter((person) => re.test(person.name)) }
    );
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleOnChangeFilter} value={personsFilter.filter} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} onChange={handleOnChangeInput} valueName={newName.name} valueNumber={newName.number}/>
      <h2>Numbers</h2>
      <Persons personsFilter={personsFilter} persons={persons}/>

    </div>
  )
}

export default App