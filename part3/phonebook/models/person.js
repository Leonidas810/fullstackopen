const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const PersonModel = mongoose.model("Person", personSchema);

module.exports = { PersonModel };
