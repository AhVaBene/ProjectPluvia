const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    id: String,
    location: {
        city: String,
        address: String,
        latitude: Number,
        longitude: Number,
        },
    pic: String,
    riskLevel: Number,
    date: Date,
    username: String
});

const reportModel = mongoose.model('Report', reportSchema)

module.exports = { reportModel }