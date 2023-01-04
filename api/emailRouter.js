const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';

const Email = require(`${dbPath}/email.schema.js`)

// Create new contract
ROUTER.post('/', async (req, res) => {
    try {
        const email = new Email({
            username: req.body.username,
            email: req.body.email,
            message: req.body.message
        });

        const foundEmail = await Email.findOne({ _id: req.body.id });
        if (foundEmail) throw new Error("Email already exists");
        const newEmail = await email.save();
        res.status(201).json({ newEmail });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = ROUTER;