const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  application: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { strict: false });

const LogModel = mongoose.model('log', logSchema);

module.exports = LogModel;
