const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visit', visitSchema);