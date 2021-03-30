//photo.js

var mongoose = require("mongoose");
var crypto = require('crypto');
//get access to Schema constructor
var Schema = mongoose.Schema;

//create a new schema for our app
var schema = new Schema({
  hash: {type: String, required:true},
  salt: {type: String, required:true},
  email: {type: String, required:true},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

schema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}
  
schema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

schema.pre('save', function(next) {
  if (!this.createdAt){
    this.createdAt = new Date();
  }else {
    this.updatedAt = new Date();
  }
  next();
});

schema.pre('update', function(next) {
  this.updatedAt = new Date();
  next();
});

schema.methods.toJSON = function(){
  return {
    _id: this._id,
    email: this.email,
    createdAt: this.createdAt
  };
}

// export the model with associated name and schema
module.exports = mongoose.model("User", schema);
