const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({});

const reportModel = mongoose.model('User', reportSchema)

module.exports = { reportModel }