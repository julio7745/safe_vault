
import mongoose from 'mongoose'

import dotenv from 'dotenv';
dotenv.config();

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    profileImage: {type: String, required: false},
    profileImageExtension: {type: String, required: false},
    deleted: {type: Boolean, required: true}
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel