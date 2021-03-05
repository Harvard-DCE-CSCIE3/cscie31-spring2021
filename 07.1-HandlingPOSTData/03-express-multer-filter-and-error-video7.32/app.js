// app.js

const express = require('express');
const path = require('path');
const url = require('url');
const photos = require('./routes/photos');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
  res.end("root requested")
});
app.use('/photos', photos);

app.use((req, res, next)=>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
