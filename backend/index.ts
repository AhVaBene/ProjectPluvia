import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './src/routes/userRoutes';
import { reportRouter } from './src/routes/reportRoutes';
import cors from 'cors';

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