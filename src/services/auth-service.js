'use strict';
const JwtUtil = require('../utils/jwt-util');
const UserModel = require('../models/user-model');
const Response = require('../utils/response');
require("dotenv").config();

exports.login = async function (request, h) {
  const user = await UserModel.findOne({"userId":request.payload['userId']}).exec();

  if(user == null) {
    return new Response('1', 'userId does not exist');
  }

  if(!user.authenticate(request.payload['userPw'])) {
    return new Response('2', 'invalid userPw');
  }

  const accessJWT = JwtUtil.sign(user['userId'], process.env.ACCESS_JWT_EXP);
  const refreshJWT = JwtUtil.sign(user['userId'], process.env.REFRESH_JWT_EXP);
  const tokens = {"access":accessJWT, "refresh":refreshJWT};
  
  return new Response('0', 'login success', tokens);
};

exports.verify = async function (request, h) {
  const user = await UserModel.findOne({"userId":request.payload['userId']}).exec();

  if(user == null) {
    return new Response('1', 'userId does not exist');
  }

  if(!user.authenticate(request.payload['userPw'])) {
    return new Response('2', 'invalid userPw');
  }
  
  return new Response('0', 'verified');
};