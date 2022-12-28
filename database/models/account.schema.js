const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    userID: {
        type: String
    },
    bankNames: {
        type: [String],

    },
    accountNumbers: {
        type: [String]

    },
    swiftCode: {
        type: String
    },
    country: {
        type: Number
    },
    currency: {
        type: Number
    },
    balance: {
        type: Number,
        default: 0
    },
    depositeAccount: {
        type: Number,
        default: 0
    },
    paymentHistory: {
        type: [Object],
        default: []
    },
    contractType: {
        type: String,
        default: "No contracts"
    },
    todayTrades: {
        type: Number,
        default: 0
    },
    todayMoney: {
        type: Number,
        default: 0
    },
    percentageInTrades: {
        type: Number,
        default: 0
    }
}, { collection: 'accounts' })

module.exports = mongoose.model('Accounts', accountSchema);