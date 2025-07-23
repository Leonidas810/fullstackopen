const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true,
    },
});

PersonSchema.set('toJSON', {
    transform: (_, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
})

const PersonModel = mongoose.model("Person", PersonSchema);

module.exports = { PersonModel };
