const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  console.log("localstrategy email  is" + email);
  User.findOne({ email })
    .then((user) => {
      console.log("controller/passport.js: localstrategy user  is" + user);
      if(!user || !user.validatePassword(password)) {
        console.log("controller/passport.js:  no user or password not validated");
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      console.log("controller/passport.js:  user password validated");
      return done(null, user);
    }).catch(done);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.email);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({'email': id}, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
