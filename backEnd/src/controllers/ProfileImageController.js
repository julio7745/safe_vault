
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const ProfileImage = require('../models/ProfileImageModel');

module.exports.get = async (req, res) => {

  try {

    const {idOfUser} = req.params._id;

    const userImage = await ProfileImage.findOne({ idOfUser });

    if (!userImage) {
      const token = jwt.sign({ message: 'PROFILE_IMAGE_GET_ERROR' }, process.env.SECRET);
      return res.json({ token });
    }

    const token = jwt.sign({ 
      message: 'PROFILE_IMAGE_GET_SUCCESSFUL',
      data: {
        userImage
      }
    }, process.env.SECRET);
    console.log(openings);
    return res.json({ token });

  } catch (error) {
    console.error(`ProfileImageController.get: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

};
