const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    criteria: {
      type: String,
      required: true,
      enum: ["Greater", "Less"],
    },
    value: {
      type: Number,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    priceSignal: {
      type: String,
      default: "DK1",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Alert", alertSchema);