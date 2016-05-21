'use strict';

const register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply.view('index', {
          data: [38.735549, -9.30307, 8, 11]
        })
      },
      description: 'Get globe',
      tags: ['get', 'globe']
    }
  });

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    config: {
      handler: {
        directory: {
          path: 'public',
          listing: true
        }
      },
      description: 'static content',
      tags: ['get', 'statics']
    }
  });

  next();
};


register.attributes = {
    name : 'getParticipants',
    version : '1.0.0'
};

module.exports = [register];
