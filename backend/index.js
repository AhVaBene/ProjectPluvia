const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/userRoutes');
const reportRouter = require('./src/routes/reportRoutes');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/dbPluvia');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/reports', reportRouter);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});