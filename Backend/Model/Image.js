const mongoose = require('mongoose')

module.exports = mongoose.model('images', {
    image: {
        data: Buffer,
        contentType: String
    }
})