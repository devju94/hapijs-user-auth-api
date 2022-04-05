'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Crypto = require('crypto');

var UserSchema = new Schema({
    userId: {
      type: String,
      require: true,
      unique: true
    },
    userPw: {
      type: String,
      require: true,
    },
    salt: {
      type: String,
      require: true 
    },
    userName: {
      type: String,
      require: true,
    },
    eMail: {
      type: String,
      require: true,
      unique: true
    },
    createDate: {
      type: Date,
      require: true
    }
  }, {
  versionKey: false
});

UserSchema.pre('save', function (next) {
  if (this.userPw && this.isModified('userPw')) {
    this.salt = Crypto.randomBytes(16).toString('base64');
    this.userPw = this.hashPassword(this.userPw);
    this.createDate = Date.now();
  }
  next();
});

UserSchema.methods.hashPassword = function (userPw) {
  if (this.salt && userPw) {
    return Crypto.pbkdf2Sync(userPw, new Buffer.from(this.salt, 'base64'), 10000, 64, 'sha512').toString('base64');
  } else {
    return userPw;
  }
};

UserSchema.methods.authenticate = function (userPw) {
  return this.userPw === this.hashPassword(userPw);
};

module.exports = Mongoose.model('User', UserSchema);