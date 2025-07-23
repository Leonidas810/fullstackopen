require('dotenv').config();
const { PersonModel } = require('./models/person');
const mongoose = require('mongoose');

const insertPerson = async (newPerson) => {
    const person = new PersonModel(newPerson);
    return await person.save();
};

const getPersons = async () => {
    const persons = await PersonModel.find();
    console.log(persons);
};

const main = async () => {
    const name = process.argv[2];
    const number = process.argv[3];

    try {
        await mongoose.connect(process.env.MONGOURL);
        if (name && number) {
            const savedPerson = await insertPerson({ name, number });
            console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`);
        } else {
            await getPersons();
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

main();
