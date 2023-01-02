const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username: {
        type: String
    },
    bankNames: {
        type: [String],
        default: []

    },
    accountNumbers: {
        type: [String],
        default: []

    },
    swiftCode: {
        type: [String],
        default: []
    },
    country: {
        type: [Number],
        default: []
    },
    currency: {
        type: [Number],
        default: []
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