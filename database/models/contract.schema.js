const mongoose = require('mongoose');

const contractSchema = mongoose.Schema({
    userID: {
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
        type: String,
        default: "0"
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: String
    },
    minProfit: {
        type: String
    },
    profitSharing: {
        type: String
    },
    maxTradeDays: {
        type: String
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