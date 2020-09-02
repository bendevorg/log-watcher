/* eslint-disable no-console */
const mongoose = require('mongoose');
const Log = require('./Log');

const DB_HOST = `mongodb://${process.env.DB_USERNAME}:${encodeURIComponent(
  process.env.DB_PASSWORD
)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}
`;

// Connect to the database
mongoose.connect(DB_HOST, {
  auto_reconnect: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

// Connection fails log the error
database.on('error', err => {
  console.error(err);
});

// Connection ok log the success
database.once('open', () => {
  console.info({ message: 'MongoDB connection is established.' });
});

// Connect lost log the event and try to reconnect
database.on('disconnected', () => {
  console.warn({ message: 'MongoDB disconnected.' });
  mongoose.connect(DB_HOST, {
    auto_reconnect: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
});

// Connect restablished log the event
database.on('reconnected', () => {
  console.info({ message: 'MongoDB reconnected.' });
});

const saveLog = async logData => {
  try {
    const createdLog = await Log.create(logData);
    return createdLog;
  } catch(err) {
    throw (err);
  }
};

module.exports = { database, saveLog };
