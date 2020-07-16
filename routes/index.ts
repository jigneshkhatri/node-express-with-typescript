import express from 'express';


const indexRouter = express.Router();

// var postgres = require('../config/postgres');

/* GET home page. */
indexRouter.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log('index');
  res.json('Hello World!');
});

export default indexRouter;
