const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.emit('conected')})
    .catch(e => console.error(`server.js: ${e}`));

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use(cors());

const IsLogged = require('./src/middlewares/IsLoggedMiddleware.js');
app.use((req, res, next) => IsLogged(req, res, next));

const routes = require('./routes.js');
app.use(routes);

app.on('conected', () => { app.listen(process.env.PORT, '0.0.0.0', () => { 
    console.log(`Host on in: ${process.env.PORT} `);
})});
