const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';
const multer = require('multer');

const Image = require(`${dbPath}/image.schema.js`)
// /api/image


const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('testImage')


ROUTER.post('/image', (req, res)=> {
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

