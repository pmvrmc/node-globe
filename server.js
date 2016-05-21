'use strict';

const Hapi = require('hapi');
const plugins = require('./lib/plugins');


const server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: 3000
});



plugins.unshift({register: require('inert')}, {register: require('vision')});

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  server.views({
    engines: {
      html: require('swig')
    },
    relativeTo: __dirname,
    path: 'public'
  });

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server started at: ' + server.info.uri);
  });
})
