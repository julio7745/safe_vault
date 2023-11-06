
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userProfileImageSchema = new mongoose.Schema({
    idOfUser: String,
    imageBuffer: Buffer,
});

const userProfileImage = mongoose.model('userProfileImage', userProfileImageSchema);

module.exports = userProfileImage;
