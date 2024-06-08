
import express from 'express';
const app = express();
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
app.use(cors());

const connect = process.env.MONGO as string
const port = process.env.PORT || 3000;

import mongoose from 'mongoose';
mongoose.connect(connect)
  .then(() => { app.emit('connected') })
  .catch(e => {
    console.error(`server.js: ${e}`);
    console.error(`Error code: ${e.code}, Error name: ${e.codeName}, Error message: ${e.errmsg}`);
  });

app.use(express.urlencoded({extended: true})); 

import IsLogedMiddleware from './src/middlewares/IsLoggedMiddleware'
app.use(IsLogedMiddleware);

import routes from './routes';
app.use(routes);

app.on('connected', () => {
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Host on in: ${port}`);
  });
});
