const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type: Number,
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
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: Number,
        require: true
    },
    language: {
        type: String,
        default: "english"
    }

}, { collection: 'users' });

module.exports = mongoose.model('Users', userSchema);