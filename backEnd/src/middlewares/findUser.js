
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const findUser = async (req, res, next) => {

  try{

    const { name, lastName, id } = req.body;
    
    const user = await User.findOne({ name, lastName, _id: id });

    if (!user) {
        const token = jwt.sign({ error: 'User does not exist!' }, 'secretpassword');
        return res.json({ token });
    }

  } catch (error) {

    const token = jwt.sign({ error }, 'secretpassword');
    return res.json({ token });

  }

  next();

}

module.exports = findUser;
