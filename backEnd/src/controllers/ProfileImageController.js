
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const ProfileImage = require('../models/ProfileImageModel');

module.exports.get = async (req, res) => {

  try {

    const {idOfUser} = req.params._id;

    const userImage = await ProfileImage.findOne({ idOfUser });

    if (!userImage) return res.status(process.env.PROFILE_IMAGE_GET_ERROR);

    const token = jwt.sign({ userImage }, process.env.SECRET);
    return res.status(process.env.PROFILE_IMAGE_GET_SUCCESSFUL).json({ token });

  } catch (error) {
    console.error(`ProfileImageController.get: ${error}`);
    return res.status(process.env.GERAL_ERROR);
  };

};
