
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

const connect = process.env.MONGO as string
const port = process.env.PORT || 3000;

import mongoose from 'mongoose';
mongoose.connect(connect)
  .then(() => { app.emit('connected') })
  .catch(e => {
    console.error(`server.js: ${e}`);
    console.error(`Error code: ${e.code}, Error name: ${e.codeName}, Error message: ${e.errmsg}`);
  });

import session from 'express-session';
import MongoStore from 'connect-mongo';
const sessionOptions = session({
  secret: process.env.SECRET as string,
  store: MongoStore.create({ mongoUrl: connect }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 5,  // 5 minutes
    httpOnly: true
  }
});
app.use(sessionOptions);

app.use(express.urlencoded({extended: true})); 

import routes from './routes';
app.use(routes);

app.on('connected', () => {
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Host on in: ${port}`);
  });
});
