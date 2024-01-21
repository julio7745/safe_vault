
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/UserModel');

module.exports.getAll = async (req, res) => {

  try{

    const users = await User.find();

    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    const token = jwt.sign({ 
      message: 'USER_GET_ALL_SUCCESSFUL',
      data: {
        users: usersWithoutPassword
      }
    }, process.env.SECRET);
    return res.json({ token });

  } catch (error) {
    console.error(`UserController.getAll: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

};
