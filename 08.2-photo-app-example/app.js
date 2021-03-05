// app.js
const express = require('express');
const path = require('path');
const photos = require('./routes/photos');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/cscie31?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})  .catch((err)=>{
    console.error(`database connection error: ${err}`);
    process.exit();
  });

// set up basics,
//   cookies, sessions, POST form handling, static
app.use(cookieParser('cscie31-secret'));
app.use(session({
  secret:"cscie31",
  resave: "true",
  saveUninitialized: "true"
}));
app.use(bodyparser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set routes
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
  res.end("root requested")
});
app.use('/photos', photos);

// handle failure of above to find a match
app.use((req, res, next)=>{
  var err = new Error(`Resource Not Found ${req.url}`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next)=>{
  if (err.status == 404){
    res.status(404).send(`Cannot find ${req.url}`);
  }
});

module.exports = app;
