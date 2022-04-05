'use strict';
const Joi = require('joi');
require("dotenv").config();

exports.plugin = {
  pkg: require('../../package.json'),
  name: 'auth-controller',
  register: async function (server, options) {
    const Servises = {
      authService: require('../services/auth-service')
    }

    server.route({
      method: 'POST',
      path: '/login',
      handler: Servises.authService.login,
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            userId: Joi.string().min(+process.env.USER_ID_MIN).max(+process.env.USER_ID_MAX).required(),
            userPw: Joi.string().min(+process.env.USER_PW_MIN).max(+process.env.USER_PW_MAX).required()
          })
        }
      }
    });

    server.route({
      method: 'POST',
      path: '/verify',
      handler: Servises.authService.verify,
      options: {
        auth: 'jwt',
        validate: {
          payload: Joi.object({
            userId: Joi.string().min(+process.env.USER_ID_MIN).max(+process.env.USER_ID_MAX).required(),
            userPw: Joi.string().min(+process.env.USER_PW_MIN).max(+process.env.USER_PW_MAX).required()
          })
        }
      }
    });

  }
};