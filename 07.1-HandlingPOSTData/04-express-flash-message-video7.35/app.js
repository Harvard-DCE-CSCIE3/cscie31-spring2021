// app.js
const express = require('express');
const path = require('path');
const photos = require('./routes/photos');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// set up 'utility' middleware
const app = express();
app.use(cookieParser('cscie31-secret'));
app.use(session({
  secret:"cscie31",
  resave: "true",
  saveUninitialized: "true"
}));
app.use(bodyparser.urlencoded({extended: false}));

// use pug view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set up routes and routers
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
  res.end("root requested")
});
app.use('/photos', photos);

// catch any remaining routing errors
app.use((req, res, next)=>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
