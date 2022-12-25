const mongoose = require('mongoose')
const uri = process.env.DB_CONNECT


let connect = async () => await mongoose.connect(
    uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = { connect }