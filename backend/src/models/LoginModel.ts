
import mongoose from 'mongoose'

import dotenv from 'dotenv';
dotenv.config();

const LoginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true}
})

const loginModel = mongoose.model('User', LoginSchema)

export default loginModel