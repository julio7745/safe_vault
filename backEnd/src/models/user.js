const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;
