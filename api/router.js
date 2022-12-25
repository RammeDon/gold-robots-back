const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models/';

const User = require(`${dbPath}/user.schema.js`)


// get all users
ROUTER.get('/users', async (_, res) => {
  let data = await Chicken.find()
  if (!data) {
      res.status(400).json(
          { message: `Error: No users in database.` }
      )
  }
  res.send(data)
});

// Create new User
ROUTER.post('/users/', async (req, res) => {
  try {
      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashPssword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hashPssword,
          role: req.body.role,
          admin: req.body.admin,
          phone: req.body.phone + "",
          email: req.body.email,

      });

      const foundUser = await User.findOne({ _id: req.body.id });
      if (foundUser) throw new Error("User already exists");
      const newUser = await user.save();
      res.status(201).json({ newUser });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

module.exports = ROUTER;
