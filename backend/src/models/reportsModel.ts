import { Location } from "../../location";

import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    id: String,
    location: Location,
    pic: String,
    riskLevel: Number,
    date: Date,
    username: String
});

export const reportModel = mongoose.model('Report', reportSchema)