const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    username: {
        type: String,
        maxLength: 50,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        require: true
    },
    language: {
        type: String,
        default: "english"
    }

}, { collection: 'users' });

module.exports = mongoose.model('Users', userSchema);