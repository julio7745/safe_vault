
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/UserModel');

module.exports.login = async (req, res) => {

  try{

    const { name, lastName, password } = req.body;

    const user = await User.findOne({ name, lastName });
    if (!user) return res.status(process.env.NON_EXISTENT_USER_ERROR);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(process.env.INCORRECT_PASSWORD_ERROR);
    
    const token = jwt.sign({ 
      _id: user_id, 
      name: user.name, 
      lastName: user.lastName,
    }, process.env.SECRET);
    return res.status(process.env.LOGIN_SUCCESSFUL).json({ token });
    
  } catch (error) {
    console.error(`LoginController.login: ${error}`);
    return res.status(process.env.GERAL_ERROR);
  };

};