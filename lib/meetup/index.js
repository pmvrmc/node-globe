'use strict';

const request = require('request');
const url = require('url');
const path = require('path');

function ProcessMeetup () {
  function getParticipants (meetupURL, callback) {
    const pathname =  url.parse(meetupURL).pathname
      .split('/')
      .filter((path) => { return path !== '' });

    const groupId = pathname[pathname.length - 3];
    const eventId = pathname[pathname.length - 1];

    request.get({
      baseUrl: 'https://api.meetup.com/',
      uri: path.join(groupId, 'events', eventId),
    }, (err, response, body) => {
      if (err) {
        throw err;
      }
      if (response.statusCode !== 200) {
        return callback(new Error('Invalid staus code ' + response.statusCode))
      };

      body = JSON.parse(body);

      return callback(null, body.yes_rsvp_count);
    });
  }

  return {
    getParticipants
  }
}

module.exports = ProcessMeetup;
