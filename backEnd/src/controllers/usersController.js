
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const User = require('../models/user');

module.exports.login = async (req, res) => {

  try{

    const { name, lastName, password } = req.body;
    const user = await User.findOne({ name, lastName });

    if (!user) {
      const token = jwt.sign({ userErrors: ['User does not exist!'] }, 'secretpassword');
      return res.json({ token });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      const token = jwt.sign({ passwordErrors: ['incorrect password!'] }, 'secretpassword');
      return res.json({ token });
    }
    
    const token = jwt.sign({ 
      id: user._id, 
      name: user.name, 
      lastName: user.lastName,
      profileImage: user.profileImage,
    }, 'secretpassword');

    res.json({ token });

  } catch (error) {

    console.error(error);
    const token = jwt.sign({ userErrors: error }, 'secretpassword');
    return res.json({ token });

  }

}

module.exports.get = async (req, res) => {

  try{

    const users = await User.find();
    
    const token = jwt.sign( { users }, 'secretpassword');
    res.send({ token });
    console.log(users);

  } catch (error) {

    console.error(error);
    const token = jwt.sign({ error }, 'secretpassword');
    return res.json({ token });

  }
  
  return;

}
