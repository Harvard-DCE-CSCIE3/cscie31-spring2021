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
      console.log("localstrategy user  is" + user);
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
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
