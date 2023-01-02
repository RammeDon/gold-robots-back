const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';

const Contract = require(`${dbPath}/contract.schema.js`)
// /api/contracts


// get all contracts
ROUTER.get('/', async (_, res) => {
    let data = await Contract.find()
    if (!data) {
        res.status(400).json(
            { message: `Error: No contracts in database.` }
        )
    }
    res.send(data)
});


// get a contract
ROUTER.get("/:id", async (req, res) => {
    try {
      const contract = await Contract.findOne({ _id: req.params.id });
      if (!contract) throw new Error("The id does not have a contract object");
  
      res.send(contract);
  
    } catch (err) {
      res.status(404);
    }
  
  });


// Create new contract
ROUTER.post('/', async (req, res) => {
    try {
        const contract = new Contract({
            username: req.body.username,
            investmentAmount: req.body.investmentAmount,
            contractType: req.body.contractType,
            depositeAmmount: req.body.depositeAmmount,
            startDate: req.body.startDate,
            duration: req.body.duration,
            minProfit: req.body.minProfit,
            profitSharing: req.body.profitSharing,
            maxTradeDays: req.body.maxTradeDays,
            adminClient: req.body.adminClient,
            personalSettings: req.body.personalSettings
        });

        const foundContract = await Contract.findOne({ _id: req.body.id });
        if (foundContract) throw new Error("Contract already exists");
        const newContract = await contract.save();
        res.status(201).json({ newContract });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// update a contract
ROUTER.put("/:id", async (req, res) => {
    try {
        const contract = await Contract.findOne({ _id: req.params.id });
        if (!contract) {
            throw new Error("contract does not exist");
        }
        contract.username = req.body.username,
            contract.investmentAmount = req.body.investmentAmount,
            contract.contractType =  req.body.contractType,
            contract.depositeAmmount = req.body.depositeAmmount,
            contract.startDate = req.body.startDate,
            contract.duration = req.body.duration,
            contract.minProfit = req.body.minProfit,
            contract.profitSharing = req.body.profitSharing,
            contract.maxTradeDays = req.body.maxTradeDays,
            contract.adminClient = req.body.adminClient,
            contract.personalSettings = req.body.personalSettings

            await contract.save();
        
        res.send(contract);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// delete a contract
ROUTER.delete("/:id", async (req, res) => {
    try {
      const contract = await Contract.findOne({ _id: req.params.id });
      if (!contract) throw new Error("contract does not exist")
  
      await Contract.deleteOne({ _id: req.params.id })
      res.status(204).send();
      
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })

module.exports = ROUTER;