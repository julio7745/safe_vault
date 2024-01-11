
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/UserModel');

module.exports.getAll = async (req, res) => {

  try{

    const users = await User.find();

    users.forEach(user => { delete user.password;});
    
    const token = jwt.sign( { users }, process.env.SECRET);
    return res.status(process.env.USER_GET_ALL_SUCCESSFUL).json({ token });

  } catch (error) {
    console.error(`UserController.getAll: ${error}`);
    return res.status(process.env.GERAL_ERROR);
  };

};
