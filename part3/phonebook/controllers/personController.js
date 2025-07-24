const { PersonModel } = require('../models/person');

const createPerson = async (newPerson) => {
    try {
        const person = new PersonModel(newPerson);
        const savedPerson = await person.save();
        return savedPerson;
    } catch (err) {
        throw err;
    }
};

const countPerson = async () => {
    try {
        const count = await PersonModel.countDocuments();
        return count;
    } catch (err) {
        throw err;
    }
}


const getOnePerson = async (id) => {
    try {
        const person = await PersonModel.findById(id);
        return person;
    } catch (err) {
        throw err;
    }
}

const getAllPersons = async () => {
    try {
        const persons = await PersonModel.find();
        return persons;
    } catch (err) {
        throw err;
    }
}

const deletePerson = async (id) => {
    try {
        const person = await PersonModel.findByIdAndDelete(id);
        return person;
    } catch (err) {
        throw err;
    }
}

const updatePerson = async (id, updatePerson) => {
    try {
        const person = await PersonModel.findByIdAndUpdate(id, updatePerson, { new: true, runValidators: true });
        return person;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createPerson,
    getAllPersons,
    deletePerson,
    getOnePerson,
    updatePerson,
    countPerson
};