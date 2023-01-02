const mongoose = require('mongoose');

const contractSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    investmentAmount: {
        type: String,
        default: "0"
    },
    contractType: {
        type: String,
        required : true
    },
    depositeAmmount: {
        type: Number,
        default: 0
    },
    minDeposite:{
        type: Number,
        default: 0
    },
    startDate: {
        type: String,
        default: ""
    },
    duration: {
        type: Number,
        default: 0
    },
    minProfit: {
        type: Number,
        default: 0
    },
    profitSharing: {
        type: Number,
        default: 0
    },
    maxTradeDays: {
        type: Number,
        default: 0
    },
    adminClient: {
        type: String
    },
    personalSettings: {
        type: Object,
        default: {leverage: "100", tradingTimeFrame: "1 min", addExtraDays: "0 D", timeRange: "Istanbul time", maxUsageDeposite: "0 %"}
    }
}, {collection: "contracts"});

module.exports = mongoose.model("Contracts", contractSchema)