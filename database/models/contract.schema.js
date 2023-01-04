const mongoose = require('mongoose');

const contractSchema = mongoose.Schema({
    adminClients: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    ammount: {
        type: String,
        default: "0"
    },
    color: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: "0000-00-00"
    },
    garantiePrecent:{
        type: Number,
        default: 0
    },
    level: {
        type: [String],
        default: ""
    },
    maxTradeDays: {
        type: Number,
        default: 0
    },
    minDeposite: {
        type: String,
        default: 0
    },
    minProfit: {
        type: Number,
        default: 0
    },
    minDuration: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: 0
    },
    profitSharing: {
        type: Number,
        default: 0
    },
    extraDays: {
        type: Number,
        default: 0
    },
    timeframe: {
        type: Number,
        default: 0
    },
    leverage: {
        type: Number,
        default: 0
    },
    timerange: {
        type: Number,
        default: 0
    },
    maxUsage: {
        string: Number,
        default: 0
    }
}, {collection: "contracts"});

module.exports = mongoose.model("Contracts", contractSchema)