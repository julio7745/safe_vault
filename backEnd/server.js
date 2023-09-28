
const express = require('express')
const app = express();

const dotenv = require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.emit('conected')})
    .catch(e => console.log(e))

app.use(express.urlencoded({extended: true})); 

app.use(express.json());

const routes = require('./routes.js');

app.use(routes) 

app.on('conected', () => { app.listen(3024, '0.0.0.0', () => { console.log(`Host on in: http://192.168.18.154:3024 `); })})
