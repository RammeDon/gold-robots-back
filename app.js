require('dotenv').config()
const express = require('express')
const app = express();
const DATABASE = require('./database/connect')
const path = require('path')
const PORT = process.env.PORT || 3000
const API = require('./api/router.js')

app.use(express.json()) // middleware
app.use('/', express.static(path.resolve(__dirname, '..', '..', 'production/')))
app.use("/api", API)  // api routes

DATABASE.connect()
    .then(() => console.log("You have been successfully connected to the Database!"))
    .then(() => app.listen(PORT, () => {
        console.log(`Express Server has started on port ${PORT}! See http://localhost:${PORT}/`)
    }));
