// app.js
require('dotenv').config();
var express = require('express');
var path = require('path');
var users = require('./routes/users');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
require('./controllers/passport');
const passport = require('passport');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/cscie31?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})  
.catch((err)=>{
    console.error(`database connection error: ${err}`);
    process.exit();
  });

var app = express();
app.use(cookieParser('cscie31-secret'));
app.use(session({
  secret:"cscie31",
  resave: "true",
  saveUninitialized: "true"
}));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
  res.render('home', { user: req.user });
});
app.use('/users', users);

app.use((req, res, next)=>{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
