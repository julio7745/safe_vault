
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { data: Buffer }
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;
