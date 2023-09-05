
const express = require('express')
const app = express();

const dotenv = require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.emit('pronto')})
    .catch(e => console.log(e))

app.use(express.urlencoded({extended: true})); 

const routes = require('./routes.js');

app.use(routes) 

app.on('pronto', () => { app.listen(3001, () => { console.log(`http://localhost:3001/login`); })})
