'use strict';
const UserModel = require('../models/user-model');
const Response = require('../utils/response');

exports.createUser = async function (request, h) {
  try {
    const user = new UserModel(request.payload);
    const result = await user.save();
    return new Response('0', 'success', {'userId':result['userId']});
  } catch(error) {
    return h.response(new Response('1', 'failed to create user')).code(500);
  }
};

exports.getUser = async function (request, h) {

  return new Response('0', 'test');
};

exports.updateUser = async function (request, h) {

  return new Response('0', 'test');
};

exports.deleteUser = async function (request, h) {

  return new Response('0', 'test');
};