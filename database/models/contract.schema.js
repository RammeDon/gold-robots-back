const mongoose = require('mongoose');

const contractSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
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
    }
}, {collection: "contracts"});

module.exports = mongoose.model("Contracts", contractSchema)