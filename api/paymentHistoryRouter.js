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


// get an payment history
ROUTER.get("/:username", async (req, res) => {

    try {
      const paymentHistory = await PaymentHistory.find({ username: req.params.username });
      if (!paymentHistory) throw new Error("The id does not have a paymentHistory");
  
      res.send(paymentHistory);
  
    } catch (err) {
      res.status(404);
    }
  
});


// Create new paymentHistory
ROUTER.post('/', async (req, res) => {
    try {
        const paymentHistory = new PaymentHistory({
            username: req.body.username,
            date: req.body.date,
            ammount: req.body.ammount,
            paymentType: req.body.paymentType,
            paymentSystem: req.body.paymentSystem
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
ROUTER.put("/:username", async (req, res) => {
    try {
        const paymentHistory = await PaymentHistory.findOne({ username: req.params.username });
        if (!user) {
            throw new Error("payment History does not exist");
        }
            paymentHistory.status = req.body.status

            await paymentHistory.save();
        
        res.send(paymentHistory);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

module.exports = ROUTER;