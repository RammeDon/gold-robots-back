const mongoose = require('mongoose');

const paymentHistorySchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    ammount: {
        type: String
    },
    paymentType: {
        type: String
    },
    paymentSystem: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    }
}, {collection: "paymentHistories"})

module.exports = mongoose.model("PaymentHistories", paymentHistorySchema)