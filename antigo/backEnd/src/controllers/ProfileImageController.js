
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const ProfileImage = require('../models/ProfileImageModel');

module.exports.get = async (req, res) => {

  try {

    const idOfUser = req.params._id;

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
    return res.json({ token });

  } catch (error) {
    console.error(`ProfileImageController.get: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

};

module.exports.update = async (req, res) => {

  try {

    const idOfUser = req.params._id;
    const imageBuffer = req.body.data.imageBuffer
    const imgExtension = req.body.data.imgExtension

    const updatedProfileImage = await ProfileImage.findOneAndUpdate(
      { idOfUser },
      { $set: { imageBuffer, extension: imgExtension } },
      { upsert: true, new: true }
    );

    const token = jwt.sign({ message: 'PROFILE_IMAGE_UPDATE_SUCCESSFUL' }, process.env.SECRET);
    return res.json({ token });
  
  } catch (error) {
    console.error(`ProfileImageController.update: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

};

module.exports.create = async (req, res) => {

  try {

    const idOfUser = req.params._id;
    const imageBuffer = req.body.data.imageBuffer
    const imgExtension = req.body.data.imgExtension

    const newImage = new ProfileImage({
      idOfUser,
      imageBuffer,
      extension: imgExtension
    });

    await newImage.save(); 

    const token = jwt.sign({ message: 'PROFILE_IMAGE_CREATE_SUCCESSFUL' }, process.env.SECRET);
    return res.json({ token });

  } catch (error) {
    console.error(`ProfileImageController.create: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };
  
};
