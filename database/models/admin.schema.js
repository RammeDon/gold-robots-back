const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required : true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, { collection: 'admins' })

module.exports = mongoose.model('Admins', adminSchema);