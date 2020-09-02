const dotenv = require('dotenv');
dotenv.config();

const Tail = require('tail').Tail;
const retrieveLogsToWatch = require('./utils/retrieveLogsToWatch');
const { database, saveLog } = require('./utils/database');
const logsPath = 'logs/';
const scanInterval = 1000;

setInterval(async () => {
  const newLogsToWatch = await retrieveLogsToWatch(logsPath);
  newLogsToWatch.forEach(logToWatch => {
    let logName = logToWatch.split('.')[0];
    logName = logName.split('/');
    const application = logName[logName.length - 1];
    tail = new Tail(logToWatch, { fromBeginning: false });
    tail.on('line', data => {
      let parsedData = {};
      try {
        parsedData = JSON.parse(data);
      } catch (err) {
        return;
      }
      saveLog({ application, ...parsedData });
    });
    tail.on('error', error => {
      console.log(`ERROR ${error}`);
    })
  });
}, scanInterval);