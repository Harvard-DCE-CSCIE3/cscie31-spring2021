// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const apiphotos = require('./routes/api/api.photos');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/cscie31?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})  
.catch((err)=>{
    console.error(`database connection error: ${err}`);
    process.exit();
  });
// initialize express
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// set up routes and routers
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/photos', apiphotos);

// catch any remaining routing errors
app.use((req, res, next)=>{
  const err = new Error('Not Found' + req.url);
  err.status = 404;
  next(err);
});
module.exports = app;
