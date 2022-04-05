'use strict';
const Hapi = require('@hapi/hapi');
const Mongoose = require("mongoose");
const JwtUtil = require('./src/utils/jwt-util');
require("dotenv").config();

const init = async () => {
  // server config
  const server = Hapi.server({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST
  });

  // connect mongoDB
  await Mongoose.connect(process.env.MONGO_URL, {
    autoIndex: true,
  }).then(()=> {
    console.log('mongoDB connected.');
  });

  // jwt validation function
  const validate = async function (decoded, request, h) {

    console.log(decoded['userId']);
    console.log(request);

    return { isValid: true };
  };

  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', { key: process.env.JWT_SECRET, validate: validate });
  server.auth.default('jwt');

  // load plugins
  await server.register([{
    plugin: require('./src/controllers/auth-controller'),
    options: {}
  }, {
    plugin: require('./src/controllers/user-controller'),
    options: {}
  }], {
    routes: {
      prefix: process.env.ROUTE_PREFIX_API_V1
    }}
  );

  // server start
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

// unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

// init
init();