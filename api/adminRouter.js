const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';
const bcrypt = require('bcryptjs');

const Admin = require(`${dbPath}/admin.schema.js`)

// Create new Admin
ROUTER.post('/', async (req, res) => {
    try {
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPssword = await bcrypt.hash(req.body.password, salt);
        const admin = new Admin({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPssword
        });

        const foundAdmin = await Admin.findOne({ _id: req.body.id });
        if (foundAdmin) throw new Error("Admin already exists");
        const newAdmin = await admin.save();
        res.status(201).json({ newAdmin });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// delete admin
ROUTER.delete("/:id", async (req, res) => {
    try {
      const admin = await Admin.findOne({ adminID: req.params.id });
      if (!admin) throw new Error("Admin does not exist")
  
      await Admin.deleteOne({ adminID: req.params.id })
      res.status(204).send();
      
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })

// get an admin
ROUTER.get("/:id", async (req, res) => {

    try {
      const admin = await Admin.findOne({ adminID: req.params.id });
      if (!admin) throw new Error("The id does not have a admin");
  
      res.send(admin);
  
    } catch (err) {
      res.status(404);
    }
  
});

module.exports = ROUTER;