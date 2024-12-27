const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    id: String,
    address: String,
    pic: String,
    riskLevel: Number,
    date: Date,
    username: String
});

const reportModel = mongoose.model('Report', reportSchema)

module.exports = { reportModel }