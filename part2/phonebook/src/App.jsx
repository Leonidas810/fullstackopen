import { useState, useEffect } from 'react'
import Filter from './components/filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notify from './components/Notify';
import personService from './controller/personController'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notify, setNotify] = useState(undefined);

  const [personsFilter, setPersonsFilter] = useState({
    filter: "",
    persons: persons
  });

  const [newName, setNewName] = useState({
    name: "",
    number: ""
  })

  useEffect(() => {
    personService.getAll()
      .then((data) => {
        setPersons(data);
      });
  }, []);

  const handleDeletePerson = async (person) => {
    const { id, name } = person;
    try {
      await personService.deletePerson(id);
      const updatedPersons = persons.filter((e)=>e.id!==id);
      setPersons(updatedPersons)
      setNotify({
        type: 'success',
        msg: `${name} is delete from phonebook`
      })
    } catch (err) {
      console.log(err)
      setNotify({
        type: 'fail',
        msg: `Information of ${name} has alredy been removed from server`
      })
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nameExists = persons.some((p) => p.name === newName.name);
      if (nameExists) {
        setNotify({
          type: 'fail',
          msg: `${newName.name} is already added to phonebook`
        });
        return;
      }
      const newPerson = {
        name: newName.name,
        number: newName.number,
        id: (persons.length + 1).toString()
      };
      await personService.create(newPerson);
      setNotify({
        type: 'success',
        msg: `${newName.name} is added to phonebook`
      })
      const updatedPersons = [...persons, newPerson];
      setPersons(updatedPersons);
      setPersonsFilter({
        filter: "",
        persons: updatedPersons
      });
    } catch (err) {
      console.log(err)
      setNotify({
        type: 'fail',
        msg: `${newName.name} is already added to phonebook`
      });
    }

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
    setPersonsFilter({ filter: e.target.value, persons: persons.filter((person) => re.test(person.name)) });
  }

  return (
    <>
      <h2>Phonebook</h2>
      {notify && <Notify {...notify} />}
      <Filter onChange={handleOnChangeFilter} value={personsFilter.filter} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} onChange={handleOnChangeInput} valueName={newName.name} valueNumber={newName.number} />
      <h2>Numbers</h2>
      <Persons handleDeletePerson={handleDeletePerson} personsFilter={personsFilter} persons={persons} />

    </>
  )
}

export default App