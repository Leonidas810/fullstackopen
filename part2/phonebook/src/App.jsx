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

  const [newPerson, setNewPerson] = useState({
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
    try {
      const deletePerson = await personService.deletePerson(person.id);
      setPersons(persons.filter((e) => e.id !== deletePerson.id));
      setNotify({ type: 'success', msg: `${deletePerson.name} is delete from phonebook` })
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error || "Error "
      setNotify({ type: 'fail', msg: message });
    }
  }

  const handleUpdatePerson = async (id) => {
    const updatedPerson = await personService.updatePerson({ id, ...newPerson });
    setPersons(persons.map((e) => e.id === id ? updatedPerson : e));
    setNotify({ type: 'fail', msg: `${newPerson.name} is already added to phonebook` });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const personExist = persons.find((p) => p.name === newPerson.name);
      if (personExist) {
        handleUpdatePerson(personExist.id);
        return;
      }
      const savedPerson = await personService.create(newPerson);
      setPersons([...persons, savedPerson]);
      setPersonsFilter({ filter: "", persons: [...persons, savedPerson] });
      setNotify({ type: 'success', msg: `${savedPerson.name} is added to phonebook` });
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error || "Error "
      setNotify({ type: 'fail', msg: message });
    }
  }

  const handleOnChangeInput = (e) => {
    e.preventDefault();
    const inputType = e.target.dataset.input;
    setNewPerson((prevState) => {
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
      <PersonForm handleSubmit={handleSubmit} onChange={handleOnChangeInput} valueName={newPerson.name} valueNumber={newPerson.number} />
      <h2>Numbers</h2>
      <Persons handleDeletePerson={handleDeletePerson} personsFilter={personsFilter} persons={persons} />

    </>
  )
}

export default App