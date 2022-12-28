const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';
const bcrypt = require('bcryptjs');
const multer = require('multer');

const User = require(`${dbPath}/user.schema.js`)
const Image = require(`${dbPath}/image.schema.js`)


const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('testImage')


ROUTER.post('/users/image', (req, res)=> {
    upload(req, res, (err)=> {
        if (err) {console.log(err)}
        else {
            const newImage = new Image({
                userID: req.body.userID,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }

            })

            newImage.save()
            .then(()=> res.send("successfully uploaded"))
            .catch((err)=> console.log(err))
        }
    })
})




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
          title: req.body.title,
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hashPssword,
          admin: req.body.admin,
          phone: req.body.phone,
          email: req.body.email,
          country: req.body.country,
          language: req.body.language

      });

      const foundUser = await User.findOne({ _id: req.body.id });
      if (foundUser) throw new Error("User already exists");
      const newUser = await user.save();
      res.status(201).json({ newUser });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});


// update a users password
ROUTER.put("/user/:id", async (req, res) => {
  try {
      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashPssword = await bcrypt.hash(req.body.password, salt);

      const user = await User.findOne({ _id: req.params.id });
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
ROUTER.put("/users/:id", async (req, res) => {
  try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
          throw new Error("User does not exist");
      }
      user.title = req.body.title,
        user.username =  req.body.username,
        user.firstname = req.body.firstname,
        user.lastname = req.body.lastname,
        user.password = hashPssword,
        user.admin = req.body.admin,
        user.phone = req.body.phone,
        user.email = req.body.email,
        user.country = req.body.country,
        user.language= req.body.language

        await user.save();
      
      res.send(user);
  } catch (err) {
      res.status(404).json({ message: err.message });
  }
});


module.exports = ROUTER;
