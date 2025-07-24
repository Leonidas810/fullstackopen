const { PersonModel } = require('../models/person');

const createPerson = async (newPerson) => {
    const person = new PersonModel(newPerson);
    const savedPerson = await person.save();
    return savedPerson;
};

const countPerson = async () => {
    const count = await PersonModel.countDocuments();
    return count;
}


const getOnePerson = async (id) => {
    const person = await PersonModel.findById(id);
    return person;
}

const getAllPersons = async () => {
    const persons = await PersonModel.find();
    return persons;
}

const deletePerson = async (id) => {
    const person = await PersonModel.findByIdAndDelete(id);
    return person;
}

const updatePerson = async (id, updatePerson) => {
    const person = await PersonModel.findByIdAndUpdate(id, updatePerson, { new: true, runValidators: true });
    return person;
}


module.exports = {
    createPerson,
    getAllPersons,
    deletePerson,
    getOnePerson,
    updatePerson,
    countPerson
};