import express from 'express';
import path = require('path');
// import cookieParser = require('cookie-parser');
// import logger = require('morgan');

import indexRouter from './routes/index';
import userRouter from './routes/user';
import Auth from './configs/Auth';

var app: express.Application = express();
const auth = Auth.instance();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth.authInterceptor);

app.use('/', indexRouter);
app.use('/user', userRouter);

module.exports = app;
