
const express = require('express')
const app = express();

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.emit('conected')})
    .catch(e => console.log(e))

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const IsLogged = require('./src/middlewares/IsLoggedMiddleware.js')
app.use((req, res, next) => IsLogged(req, res, next));

const routes = require('./routes.js');
app.use(routes) 

app.on('conected', () => { app.listen(3024, '0.0.0.0', () => { 
    console.log(`Host on in: 3024 `)
})})
