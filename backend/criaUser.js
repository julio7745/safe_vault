
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config()

// Configuração da conexão com o MongoDB
mongoose.connect(process.env.MONGO);

const Schema = mongoose.Schema;

// Definição do modelo de usuário
const userSchema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  profileImage: {type: String, required: false},
  profileImageExtension: {type: String, required: false},
  fingerId: {type: Number, required: true},
  deleted: {type: Boolean, required: true}
});

const User = mongoose.model('User', userSchema);

// Dados do usuário
const userData = {
  name: process.env.NEWUSERNAME,
  lastName: process.env.NEWUSERLASTNAME,
  password: process.env.NEWUSERPASSWORD,
  fingerId: Number(process.env.NEWUSERFINGERID),
  deleted: false,
};

// Função para criar um usuário
const createUser = async () => {
  try {
  
  
    // Hash da senha usando bcrypt com um fator de hash de 10
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Criação do usuário com a senha hashada
    userData.password = hashedPassword;
    const newUser = new User(userData);

    // Salva o usuário no MongoDB
    await newUser.save();

    console.log('Usuário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  }
};

// Evento "open" para garantir que a função createUser seja chamada após a conexão
mongoose.connection.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
  createUser(); // Chama a função createUser após a conexão ser estabelecida
});

// Lidar com erros de conexão
mongoose.connection.on('error', (error) => {
  console.error('Erro na conexão com o MongoDB:', error);
});
