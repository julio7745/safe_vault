
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const code = require('../utils/code.js')

const User = require('../models/UserModel');

module.exports.login = async (req, res) => {

  try{

    const { name, lastName, password } = req.body;

    const user = await User.findOne({ name, lastName });
    if (!user) return res.status(code.NON_EXISTENT_USER_ERROR).send('User does not exist');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(code.INCORRECT_PASSWORD_ERROR);
    
    const token = jwt.sign({ 
      _id: user_id, 
      name: user.name, 
      lastName: user.lastName,
    }, code.SECRET);
    return res.status(code.LOGIN_SUCCESSFUL).json({ token });
    
  } catch (error) {
    console.error(`LoginController.login: ${error}`);
    return res.status(code.GERAL_ERROR);
  };

};