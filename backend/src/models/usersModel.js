const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    admin: Number,
    locations: [{
        city: String,
        address: String,
        latitude: Number,
        longitude: Number,
        }
    ]
});

const userModel = mongoose.model('User', userSchema)

module.exports = { userModel }