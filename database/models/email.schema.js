const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    message: {
        type: String,
        default: ""
    },
}, {collection: "emails"});

module.exports = mongoose.model("Emails", emailSchema)