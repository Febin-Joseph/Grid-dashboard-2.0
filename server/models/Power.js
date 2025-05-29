const mongoose = require("mongoose");

const powerSchema = new mongoose.Schema({
  hour: {
    type: String,
    required: true,
  },
  dk1Value: {
    type: Number,
    required: true,
  },
  dk2Value: {
    type: Number,
    required: true,
  },
  dkGasValue: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model("Power", powerSchema);