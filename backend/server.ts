
import express from 'express';
const app = express();

import * as cors from 'cors';
app.use(cors());
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
mongoose.connect( process.env.MONGO, 
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => { app.emit('conected')})
.catch(e => console.error(`server.js: ${e}`));

import bodyParser from 'body-parser';
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use(cors());

import IsLogged from './src/middlewares/IsLoggedMiddleware.ts';
app.use((req, res, next) => IsLogged(req, res, next));

import routes from './routes.js';
app.use(routes);

const port = process.env.PORT || 3000;
app.on('conected', () => { app.listen(port, '0.0.0.0', () => { 
    console.log(`Host on in: ${port} `);
})});
