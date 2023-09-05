//declara express
const express = require('express')

//declara que o  modulo são rotas do express
const route = express.Router();

//ROTAS

//login
const loginController = require('./src/controllers/loginController.js')
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// home
const homeController = require('./src/controllers/homeController.js')
route.get('/home', homeController.index)
route.get('/', homeController.index)

// contatos
const contatosController = require('./src/controllers/contatosController.js')
route.get('/NewContato', contatosController.index)
route.post('/NewContato/register', contatosController.register)
route.get('/contato/:id', contatosController.visualise)
route.post('/editcontato/:id', contatosController.edit)
route.get('/excluirctt/:id', contatosController.delete)

// exporta respostas a cada rotas
module.exports = route;
