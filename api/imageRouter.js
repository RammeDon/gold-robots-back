const express = require('express');
const ROUTER = express.Router();
const dbPath = '../database/models';
const multer = require('multer');
const fs = require('fs')

const Image = require(`${dbPath}/image.schema.js`)
// /api/images


// const Storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// }) 



function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../gold-robots-front/public/uploads")
    },
    filename: (req, file, cb) => {
        // const randomNumber = between(10, 200);
        const newFilename = file.originalname
        cb(null, newFilename);
    }
});

const upload = multer({ storage }).any();


// const Storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const fs = require('fs')
//         const filesDir = `./../../../gold-robots-front/public/uploads`;
        
//         // check if directory exists
//         if (!fs.existsSync(filesDir)) {
//         // if not create directory
//             fs.mkdirSync(filesDir);
        
//         }
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage: Storage })


ROUTER.get("/", async (req, res) => {
    const allImages = await Image.find()

    res.json(allImages)
})


ROUTER.get("/:username", async (req, res) => {
    

    try {
        const image = await Image.findOne({ username: req.params.username });
        if (!image) throw new Error("The id does not have a user object");

        res.json(image)

    } catch (err) {
        res.status(404);
    }
})



ROUTER.post('/', upload, (req, res) => {
    const saveImage = new Image({
        username: req.body.username,
        file: req.body.file
    })

    // console.log(saveImage)

    saveImage
        .save()
        .then((res) => {console.log("Image saved!")})
        .catch((err) => {console.log(err, ": error has occured")})
        res.send("image is saved")
})


// ROUTER.post('/image', (req, res)=> {
//     upload(req, res, (err)=> {
//         if (err) {console.log(err)}
//         else {
//             const newImage = new Image({
//                 username: req.body.username,
//                 image: {
//                     data: req.file.filename,
//                     contentType: 'image/png'
//                 }

//             })

//             newImage.save()
//             .then(()=> res.send("successfully uploaded"))
//             .catch((err)=> console.log(err))
//         }
//     })
// })

module.exports = ROUTER;