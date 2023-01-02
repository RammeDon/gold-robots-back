const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';
const bcrypt = require('bcryptjs');

const Account = require(`${dbPath}/account.schema.js`)


// get all accounts
ROUTER.get('/', async (_, res) => {
    let data = await Account.find()
    if (!data) {
        res.status(400).json(
            { message: `Error: No Accounts in database.` }
        )
    }
    res.send(data)
});


// get an account
ROUTER.get("/:username", async (req, res) => {
    try {
      const account = await Account.findOne({ username: req.params.username });
      if (!account) throw new Error("The id does not have a account object");

    //   res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    //   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //   res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // console.log(account)
        res.send(account);
    } catch (err) {
      res.status(404);
    }
  });


// create new account
ROUTER.post('/', async (req, res) => {
    try {
        const account = new Account({
            username: req.body.username,
            bankNames: req.body.bankNames,
            accountNumbers: req.body.accountNumbers,
            swiftCode: req.body.swiftCode,
            country: req.body.country,
            currency: req.body.currency,
            balance: req.body.balance,
            depositeAccount: req.body.depositeAccount,
            paymentHistory: req.body.paymentHistory,
            contractType: req.body.contractType,
            todayTrades: req.body.todayTrades,
            todayMoney: req.body.todayMoney,
            percentageInTrades: req.body.percentageInTrades
        });

        const foundAccount = await Account.findOne({ username: req.body.username });
        if (foundAccount) throw new Error("Account already exists");
        const newAccount = await account.save();
        res.status(201).json({ newAccount });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// update an account
ROUTER.put("/:username", async (req, res) => {
    try {
        const account = await Account.findOne({ username: req.params.username });
        if (!account) {
            throw new Error("Account does not exist");
        }
        account.username = req.body.username,
            account.bankNames =  req.body.bankNames,
            account.accountNumbers = req.body.accountNumbers,
            account.swiftCode = req.body.swiftCode,
            account.country = req.body.country,
            account.currency = req.body.currency,
            account.balance = req.body.balance,
            account.depositeAccount = req.body.depositeAccount,
            account.paymentHistory = req.body.paymentHistory,
            account.contractType= req.body.contractType,
            account.todayTrades= req.body.todayTrades,
            account.todayMoney= req.body.todayMoney,
            account.percentageInTrades= req.body.percentageInTrades,

            await account.save();
        
        res.send(account);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


// delete account
ROUTER.delete("/:username", async (req, res) => {
    try {
      const account = await Account.findOne({ username: req.params.username });
      if (!account) throw new Error("account does not exist")
  
      await Account.deleteOne({ username: req.params.username })
      res.status(204).send();
      
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })
  

module.exports = ROUTER;