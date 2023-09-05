//declara exprees (servidor)
const express = require('express')
const app = express();

//declara dotenv (substitui valores reservados) e ja executa
const dotenv = require('dotenv').config()

//declara mongoose (banco de dados)
const mongoose = require('mongoose')

//mandando conectar ao banco de dados
mongoose.connect(process.env.LOGIN, { useNewUrlParser: true, useUnifiedTopology: true })

    //A função conect retorna uma processa, logo, quando ela for resolvida, emitimos uma mensagem
    .then(() => {
        app.emit('pronto')
    })
    .catch(e => console.log(e))

//Importando biblioteca de sessões 
const session = require('express-session')

//Importando biblioteca que relaciona a conexão das sessões com o mongo, e já relacionando 
const ConnectMongo = require('connect-mongo')(session)

//criando configurações da sessão
const sessionOptions = session({

    //aleatório
    secret: process.env.SECRET,

    //estamos armazenando no mongodb
    store: new ConnectMongo({ mongooseConnection: mongoose.connection }), 

    //outras configurações
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 5,    //tempo que o dado vai ficar salvo em (ms) 
        httpOnly: true
    }
})

//estamos falando que o servidor vai usar a configuração da sessão criada
app.use(sessionOptions)

//vamos usar o flash nas sessoes
const flash = require('connect-flash')
app.use(flash())

// Podemos usar form. com POST
app.use(express.urlencoded({extended: true})); 

//importa rotas
const routes = require('./routes.js');

//declara renderizador
app.set('views', './src/views/');
app.set('view engine', 'ejs');

//declara objetos estaticos
app.use(express.static('./public'))

//importa midllewares
const midllewares = require('./src/middleware/middleware.js')

//usa middlewares de antes
app.use(midllewares.messages)
app.use(midllewares.checklogin)

//usa as rotas
app.use(routes) 

//usa middlewares de depois
app.use(midllewares.check404Error)

//quando a mensagem for recebida
app.on('pronto', () => {
    
    //iniciamos o servidor
    app.listen(3001, () => {
        console.log(`Acessar http://localhost:3001/login`);
    })
})
