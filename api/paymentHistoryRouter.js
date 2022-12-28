const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';

const PaymentHistory = require(`${dbPath}/paymentHistory.schema.js`)

// get all paymentHistory
ROUTER.get('/', async (_, res) => {
    let data = await PaymentHistory.find()
    if (!data) {
        res.status(400).json(
            { message: `Error: No payment history in database.` }
        )
    }
    res.send(data)
});


// Create new paymentHistory
ROUTER.post('/', async (req, res) => {
    try {
        const paymentHistory = new PaymentHistory({
            userID: req.body.userID,
            accountID: req.body.accountID,
            date: req.body.date,
            ammount: req.body.ammount,
            paymentType: req.body.paymentType,
            paymentSystem: req.body.paymentSystem,
            status: req.body.status
        });

        const foundPaymentHistory = await PaymentHistory.findOne({ _id: req.body.id });
        if (foundPaymentHistory) throw new Error("payment History already exists");
        const newPaymentHistory = await paymentHistory.save();
        res.status(201).json({ newPaymentHistory });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update a contract
ROUTER.put("/:id", async (req, res) => {
    try {
        const paymentHistory = await PaymentHistory.findOne({ _id: req.params.id });
        if (!user) {
            throw new Error("payment History does not exist");
        }
        paymentHistory.title = req.body.userID,
            paymentHistory.accountID =  req.body.accountID,
            paymentHistory.date = req.body.date,
            paymentHistory.ammount = req.body.ammount,
            paymentHistory.paymentType = paymentType,
            paymentHistory.paymentSystem = req.body.paymentSystem,
            paymentHistory.status = req.body.status

            await paymentHistory.save();
        
        res.send(paymentHistory);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

module.exports = ROUTER;