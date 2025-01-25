const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/userRoutes.js');
const reportRouter = require('./src/routes/reportRoutes.js');
const cors = require('cors');
const path = require('path')
const { createServer } = require('http');

mongoose.connect('mongodb://localhost:27017/dbPluvia');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/reports', reportRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});