
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const User = require('../models/user');

const login = async (req, res) => {

  console.log('recebido')

  try{

    const { name, lastName, password } = req.body;  
    const user = await User.findOne({ name, lastName });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }
    
    const token = jwt.sign({ id: user.id, name: user.name, lastName: user.lastName }, 'secretpassword');
    res.json({ token });

    console.log('enviado')

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
}

module.exports = login;
