import express from 'express';
import path = require('path');
// import cookieParser = require('cookie-parser');
// import logger = require('morgan');

import indexRouter from './routes/index';
import usersRouter from './routes/users';

var app: express.Application = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
