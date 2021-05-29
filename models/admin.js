const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    birthdays: {
        type: String,
        required: true
    },
    message: {
        type: String
    }
});

module.exports = mongoose.model('admin', adminSchema);