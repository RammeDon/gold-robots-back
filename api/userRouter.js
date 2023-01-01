const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require(`${dbPath}/user.schema.js`)
// /api/users


// get all users
ROUTER.get('/', async (_, res) => {
    let data = await User.find()
    if (!data) {
        res.status(400).json(
            { message: `Error: No users in database.` }
        )
    }
    res.send(data)
});


// login validator
ROUTER.post('/login', async (req, res) => {
    console.log('Logging in...');
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(400).json({ error: 'Username not found!' });
    };

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid password!' })
    };

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.header('token', token).json({ token });

    console.log('Login Complete!');
});


// get a user
ROUTER.get("/:username", async (req, res) => {

    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) throw new Error("The id does not have a user object");
  
      res.send(user);
  
    } catch (err) {
      res.status(404);
    }
  
  });
  
// Create new User
ROUTER.post('/', async (req, res) => {
    try {
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPssword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            title: req.body.title,
            userID: req.body.userID,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashPssword,
            birthDay: req.body.birthDay,
            phone: req.body.phone,
            email: req.body.email,
            country: req.body.country,
            language: req.body.language,
            accoutID: req.body.accountID,
            contractID: req.body.contractID,
            profilePictureID: req.body.profilePictureID
        });

        const foundUser = await User.findOne({ username: req.body.username });
        if (foundUser) throw new Error("User already exists");
        const newUser = await user.save();
        res.status(201).json({ newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// update a users password
ROUTER.put("/:username", async (req, res) => {
    try {
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPssword = await bcrypt.hash(req.body.password, salt);

        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            throw new Error("User does not exist");
        }
        user.password = hashPssword;
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


// update a user
ROUTER.put("/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            throw new Error("User does not exist");
        }

        user.title = req.body.title,
            user.userID = req.body.userID,
            user.username = req.body.username,
            user.firstname = req.body.firstname,
            user.lastname = req.body.lastname,
            user.password = hashPssword,
            user.birthDay = req.body.birthDay,
            user.phone = req.body.phone,
            user.email = req.body.email,
            user.country = req.body.country,
            user.language = req.body.language,
            user.accoutID = req.body.accountID,
            user.contractID = req.body.contractID,
            user.profilePictureID = req.body.profilePictureID

            await user.save();
        
        res.send(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


// delete user
ROUTER.delete("/:id", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) throw new Error("User does not exist")
  
      await User.deleteOne({ _id: req.params.id })
      res.status(204).send();
      
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
})

module.exports = ROUTER;
  