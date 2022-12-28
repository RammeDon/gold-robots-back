require('dotenv').config()
const express = require('express')
const app = express();
const DATABASE = require('./database/connect')
const path = require('path')
const PORT = process.env.PORT || 3000
const ACCOUNT = require('./api/accountRouter.js')
const USER = require('./api/userRouter.js')
const IMAGE = require('./api/imageRouter.js')


app.use(express.json()) // middleware
app.use('/', express.static(path.resolve(__dirname, '..', '..', 'production/')))

// api routes
app.use("/api/accounts", ACCOUNT)
app.use("/api/users", USER)

DATABASE.connect()
    .then(() => console.log("You have been successfully connected to the Database!"))
    .then(() => app.listen(PORT, () => {
        console.log(`Express Server has started on port ${PORT}! See http://localhost:${PORT}/`)
    }));

module.exports = app;