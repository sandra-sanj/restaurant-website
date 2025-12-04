import express from 'express';
import api from './api/index.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handlers.js';
import cors from 'cors';

const app = express();

//tän voi varmaan poistaa kun siirretään serverille
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://wsk-server.francecentral.cloudapp.azure.com',
      'https://www.wsk-server.francecentral.cloudapp.azure.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.static('public')); // website is served from public folder
app.use('/uploads', express.static('uploads'));

app.use(express.json()); // parse json data from http request
app.use(express.urlencoded({extended: true}));
app.use('/api/v1', api); // adds prefix and guides all requests to routes inside api

app.use(notFoundHandler); // default for all routes not handled by routers above
app.use(errorHandler); // error handler

export default app;
