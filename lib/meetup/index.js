'use strict';

const request = require('request');
const url = require('url');
const path = require('path');
const tabletop = require('tabletop');
const async = require('async');
const sheet = '1swvC909BzbpToZLePM6whDvmXavaxEG6eT257dVf-bY';

function ProcessMeetup () {

  function getNodeschoolData(spreadsheet, callback) {
    tabletop.init({
      key: spreadsheet,
      callback: (data) => { callback(null, data) },
      simpleSheet: true
    });
  }

  function filterItemsWithMeetupUrl(data, callback) {
    async.filter(data, (item, cbAsync) => {
      cbAsync(null, item.Website.match(/.*meetup\.com\/.*\/events\/\d+.*/))
    }, callback);
  }

  function addParticipantsToItems(data, callback) {
    async.map(data, (item, cbAsync) => {
      getParticipants(item.Website, (err, count) => {
        if (err) return cbAsync(err);
        item.Participants = count;
        cbAsync(null, item);
      })
    }, callback);
  }

  function complementNodeschoolData(sheet, callback) {
    async.waterfall([
      async.apply(getNodeschoolData, sheet),
      filterItemsWithMeetupUrl,
      addParticipantsToItems
    ], callback);
  }

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

  function generateTupleArray (data, callback) {
    async.reduce(data, [], (tupleArray, event, cbAsync) => {
      if (event === undefined) return cbAsync(null, tupleArray)
      let color = 7;
      if (event.Participants <= 6) {
        color = 8;
      }
      if (event.Participants <= 4) {
        color = 9;
      }
      if (event.Participants <= 2) {
        color = 14;
      }
      tupleArray.push(event.Latitude, event.Longitude, event.Participants, color);
      return cbAsync(null, tupleArray);
    }, callback);
  }

  return {
    getParticipants,
    getNodeschoolData,
    complementNodeschoolData,
    generateTupleArray
  }
}

module.exports = ProcessMeetup;
