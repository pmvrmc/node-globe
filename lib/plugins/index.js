'use strict';

const meetup = require('../meetup')();

const register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        const sheet = '1swvC909BzbpToZLePM6whDvmXavaxEG6eT257dVf-bY';

        meetup.complementNodeschoolData(sheet, (err, data) => {
          if (err) throw err;
          meetup.generateTupleArray(data, (err, tuples) => {
            if (err) throw err;
            reply.view('index', {
              data: tuples
            });
          });
        });
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
