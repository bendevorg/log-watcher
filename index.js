const Tail = require('tail').Tail;
const retrieveLogsToWatch = require('./utils/retrieveLogsToWatch');
const logsPath = './logs/';
const scanInterval = 30000;

setInterval(async () => {
  const newLogsToWatch = await retrieveLogsToWatch(logsPath);
  console.log(newLogsToWatch);
  newLogsToWatch.forEach(logsToWatch => {
    tail = new Tail(logsToWatch, { fromBeginning: false });
    tail.on('line', data => {
      console.log(`New line ${data}`);
    });
    tail.on('error', error => {
      console.log(`ERROR ${error}`);
    })
  });
}, scanInterval);