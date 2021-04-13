//users.js
const express = require('express');
const router = express.Router();
const app = express();
const flash = require('express-flash');
const User = require('../models/userModel');
const auth = require('../routes/auth');
const passport = require('passport');

router.use(flash());

router.get('/', auth.required, (req, res, next)=>{
   console.log("found user in session "+req.session.user);
   res.render('user', {
     user : req.user
   });
});

router.get('/login', auth.optional, (req, res, next)=>{
  res.render('login', {
    flashMsg: req.flash("")
  });
});

router.get('/logout', auth.optional, (req, res, next)=>{
  req.logout();
  res.render('login', {
    flashMsg: req.flash("Logged out")
  });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/users/login',
    failureFlash: true
  })
);

router.get('/register', auth.optional, (req, res, next)=>{
  res.render('register');
});

router.post('/register', auth.optional, (req, res, next)=>{
 console.log("posting "+req.param('email'));
 User.findOne({'email': req.param('email')}, (err, user) => {
     if (err){
       return res.send("Error!");
     }
     console.log(user);
     if (user){
       console.log("Found user - should not continue");
       return res.send("User Exists");
     }
     const data  = {
         email: req.body.email,
    }
    // if we got here, there's no user found
    user = new User();
    user.set(data);
    user.setPassword(req.body.password);
    user.save().then(()=>{
        if(err) {
          return next(err);
        }
        req.session.user = user;
        console.log("redirecting to user page");
        res.redirect('/users/');
    }).catch((err)=>{
      console.log(err);
    });
   });
});

router.use(function(err, req, res, next){
  console.error(err.stack);
});

module.exports = router;
