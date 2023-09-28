
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const User = require('../models/user');

const login = async (req, res) => {

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
    
    const token = jwt.sign({ id: user.id, name: user.name, lastName: user.lastName }, 'secretpassword');
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
}

module.exports = login;
