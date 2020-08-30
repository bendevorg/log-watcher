const fs = require('fs');
const cache = require('./cache');

module.exports = async logsPath => {
  const newLogPaths = [];
  fs.readdirSync(logsPath).forEach(fileName => {
    const logPath = `${logsPath}${fileName}`;
    if (cache.get(logPath)) {
      return;
    }
    cache.set(logPath, true);
    newLogPaths.push(logPath);
  });
  return newLogPaths;
};
