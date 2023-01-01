
const mongoose = require('mongoose');
mongoose.set("strictQuery", false)

const imageSchema = mongoose.Schema({
    username: {
        type : String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
}, { collection: 'images' })

module.exports = mongoose.model('Images', imageSchema);