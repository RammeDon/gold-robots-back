const express = require("express");
const ROUTER = express.Router();
const dbPath = "../database/models";

const Contract = require(`${dbPath}/contract.schema.js`);
// /api/contracts

// get all contracts
ROUTER.get("/:id", async (req, res) => {
  let data = await Contract.find({ username: req.params.id });
  if (!data) {
    res.status(400).json({ message: `Error: No contracts in database.` });
  }
  res.send(data);
});

// // get a contract
// ROUTER.get("/:id", async (req, res) => {
//     try {
//       const contract = await Contract.findOne({ username: req.params.id });
//       if (!contract) throw new Error("The id does not have a contract object");

//       res.send(contract);

//     } catch (err) {
//       res.status(404);
//     }

//   });

// get all contracts
ROUTER.get("/", async (_, res) => {
  let data = await Contract.find();
  if (!data) {
    res.status(400).json({ message: `Error: No contracts in database.` });
  }
  res.send(data);
});

// Create new contract
ROUTER.post("/", async (req, res) => {
  try {
    const contract = new Contract({
      username: req.body.username,
      ammount: req.body.ammount,
      color: req.body.color,
      date: req.body.date,
      garantiePrecent: req.body.garantiePrecent,
      level: req.body.level,
      maxTradeDays: req.body.maxTradeDays,
      minProfit: req.body.minProfit,
      name: req.body.name,
      minDuration: req.body.minDuration,
      minDeposite: req.body.profitSharing,
      adminClients: req.body.adminClients,
      profitSharing: req.body.profitSharing,
      extraDays: req.body.extraDays,
      timeframe: req.body.timeframe,
      leverage: req.body.leverage,
      timerange: req.body.timerange,
      maxUsage: req.body.maxUsage,
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
ROUTER.put("/:username", async (req, res) => {
  try {
    const contract = await Contract.findOne({
      username: req.params.username,
      name: req.body.name,
    });
    if (!contract) {
      throw new Error(`contract does not exist ${req.params.username} ${req.body.name}`, {
        username: req.params.username,
        name: req.body.name,
      });
    }
    (contract.ammount = req.body.ammount),
      (contract.color = req.body.color),
      (contract.date = req.body.date),
      (contract.garantiePrecent = req.body.garantiePrecent),
      (contract.level = req.body.level),
      (contract.maxTradeDays = req.body.maxTradeDays),
      (contract.maxTradeDays = req.body.maxTradeDays),
      (contract.minDuration = req.body.minDuration),
      (contract.profitSharing = req.body.profitSharing),
      (contract.adminClients = req.body.adminClients),
      (contract.profitSharing = req.body.profitSharing),
      (contract.extraDays = req.body.extraDays),
      (contract.timeframe = req.body.timeframe),
      (contract.leverage = req.body.leverage),
      (contract.timerange = req.body.timerange),
      (contract.maxUsage = req.body.maxUsage);
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
    if (!contract) throw new Error("contract does not exist");

    await Contract.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = ROUTER;
