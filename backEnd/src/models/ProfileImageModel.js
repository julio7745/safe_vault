
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileImageSchema = new mongoose.Schema({
    idOfUser: String,
    imageBuffer: Buffer,
});

const ProfileImage = mongoose.model('userProfileImage', ProfileImageSchema);

module.exports = ProfileImage;
