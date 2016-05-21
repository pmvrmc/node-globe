const parseUrl = require('./index.js')();


parseUrl.getParticipants('http://www.meetup.com/pt-BR/require-lx/events/218223032/?eventId=218223032', (err, nPar) => {
  console.log(nPar);
})
