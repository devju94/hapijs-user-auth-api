'use strict';
const Joi = require('joi');
require("dotenv").config();

exports.plugin = {
  pkg: require('../../package.json'),
  name: 'user-controller',
  register: async function (server, options) {
    const Servises = {
      userService: require('../services/user-service')
    }

    server.route({
      method: 'POST',
      path: '/user',
      handler: Servises.userService.createUser,
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            userId: Joi.string().min(+process.env.USER_ID_MIN).max(+process.env.USER_ID_MAX).required(),
            userPw: Joi.string().min(+process.env.USER_PW_MIN).max(+process.env.USER_PW_MAX).required(),
            userName: Joi.string().min(+process.env.USER_NAME_MIN).max(+process.env.USER_NAME_MAX).required(),
            eMail: Joi.string().email({ tlds: { allow: false } })
          })
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/user',
      handler: Servises.userService.getUser,
      options: { auth: 'jwt' }
    });

    server.route({
      method: 'PUT',
      path: '/user',
      handler: Servises.userService.updateUser,
      options: { auth: 'jwt' }
    });

    server.route({
      method: 'DELETE',
      path: '/user',
      handler: Servises.userService.deleteUser,
      options: { auth: 'jwt' }
    });

  }
};