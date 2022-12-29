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
            userID: req.body.userID,
            contractType: req.body.contractType,
            depositeAmmount: req.body.depositeAmmount,
            startDate: req.body.startDate,
            duration: req.body.duration,
            minProfit: req.body.minProfit,
            profitSharing: req.body.profitSharing,
            maxTradeDays: req.body.maxTradeDays,
            adminClient: req.body.adminClient
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
        if (!user) {
            throw new Error("contract does not exist");
        }
        contract.title = req.body.title,
            contract.username =  req.body.username,
            contract.firstname = req.body.firstname,
            contract.lastname = req.body.lastname,
            contract.password = hashPssword,
            contract.admin = req.body.admin,
            contract.phone = req.body.phone,
            contract.email = req.body.email,
            contract.country = req.body.country,
            contract.language= req.body.language

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