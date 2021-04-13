//users.js
const express = require('express');
const router = express.Router();
const app = express();
const flash = require('express-flash');
const User = require('../models/userModel');
const auth = require('../routes/auth');
const passport = require('passport');

router.use((req, res, next)=>{
  res.set({
  // allow any domain, allow REST methods we've implemented
    'Access-Control-Allow-Origin': req.get('Origin') || '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
  // Set content-type for all api requests
    'Content-type':'application/json'
  });
  if (req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});

router.get('/currentUser', auth.apiRequired, (req, res, next)=>{
  const email = req.user.email;
   User.findOne({'email': email}, (err, user) => {
      if (err){
        return res.send("Error!");
      }
      res.json( user );
    });
  console.log("founduser "+user);
});



router.use(function(err, req, res, next){
  console.error(err.stack);
});

module.exports = router;
