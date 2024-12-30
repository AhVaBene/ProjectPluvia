import { Location } from "../../location";

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: Number,
    indirizzi: [Location]
});

export const userModel = mongoose.model('User', userSchema)