const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true
    },
    birthdays: {
        type: Array
    }
});

module.exports = mongoose.model('user', userSchema);