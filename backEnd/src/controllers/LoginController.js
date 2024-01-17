
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/UserModel');

module.exports.login = async (req, res) => {

  try{

    const { name, lastName, password } = req.body;

    const user = await User.findOne({ name, lastName });
    if (!user) {
      const token = jwt.sign({ message: 'NON_EXISTENT_USER_ERROR' }, process.env.SECRET);
      return res.json({ token });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const token = jwt.sign({ message: 'INCORRECT_PASSWORD_ERROR' }, process.env.SECRET);
      return res.json({ token });
    }

    const token = jwt.sign({ 
      message: 'LOGIN_SUCCESSFUL',
      data: {
        _id: user._id, 
        name: user.name, 
        lastName: user.lastName,
      }
    }, process.env.SECRET);
    console.log(token);
    return res.json({ token });
    
  } catch (error) {
    console.error(`LoginController.login: ${error}`);
    const GERAL_ERROR = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json( GERAL_ERROR );
  };

};