const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID: {
        type: String,
        default: ""
    },
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
    birthDay: {
        type: String,
        required: true
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
    },
    accountID: {
        type: String,
        default: "No Account Yet"
    },
    openAccountDate: {
        type: Date,
        default: Date.now
    },
    contractID: {
        type: String,
        default: "No Contracts Yet"
    },
    personalSettings: {
        type: Object,
        default: {leverage: "100", tradingTimeFrame: "1 min", addExtraDays: "0 D", timeRange: "Istanbul time", maxUsageDeposite: "0 %"}
    },
    profilePictureID: {
        type: String,
        default: "No photo"
    }

}, { collection: 'users' });

module.exports = mongoose.model('Users', userSchema);