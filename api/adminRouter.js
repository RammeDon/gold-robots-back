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
            adminID: req.body.adminID,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
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


// login validator
ROUTER.post('/login', async (req, res) => {
  console.log('Logging in...');
  const admin = await Admin.findOne({ username: req.body.username });

  if (!admin) {
      return res.status(400).json({ error: 'Admin not found!' });
  };

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password!' })
  };

  const token = jwt.sign({ _id: admin._id }, process.env.ACCESS_TOKEN_SECRET);
  res.header('token', token).json({ token });

  console.log('Login Complete!');
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