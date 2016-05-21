const parseUrl = require('./index.js')();

const sheet = '1swvC909BzbpToZLePM6whDvmXavaxEG6eT257dVf-bY';

parseUrl.getParticipants('http://www.meetup.com/pt-BR/require-lx/events/218223032/?eventId=218223032', (err, nPar) => {
  console.log(nPar);
})
//
parseUrl.getNodeschoolData(sheet, (data) => { console.log(data); });

parseUrl.complementNodeschoolData(sheet, (e, data) => {
  console.log(data);
});
