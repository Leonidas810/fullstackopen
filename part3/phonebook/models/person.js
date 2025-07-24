const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name required'],
        unique: true,
        minLength: 3,
    },
    number: {
        type: String,
        required: [true, 'User phone number required'],
        validate: {
            validator: function (v) {
                return /\d{2,3}-\d{6,15}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
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
