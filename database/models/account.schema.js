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
        type: [String],
        default: []
    },
    currency: {
        type: [String],
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
    newTrades: {
        type: Number,
        default:0
    },
    todayMoney: {
        type: Number,
        default: 0
    },
    days: {
        type: Number,
        default: 0
    },
    percentageInTrades: {
        type: Number,
        default: 0
    },
    balanceOverView: {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    activeTradesToday: {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0, 0]
    },
    activeTradesLastWeek: {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0, 0]
    }
}, { collection: 'accounts' })

module.exports = mongoose.model('Accounts', accountSchema);