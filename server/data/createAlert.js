const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Alert = require("../models/Alert");

dotenv.config();

const addAlerts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const userId = "683860e5bcfe39a14172555b"

    const alerts = [
      {
        name: "Morning Price Spike",
        criteria: "Greater",
        value: 4.0,
        days: "Monday,Tuesday",
        email: "notify1@example.com",
        phone: "+4520123456",
        priceSignal: "DK1",
        userId,
      },
      {
        name: "Evening Low Alert",
        criteria: "Less",
        value: 1.5,
        days: "Thursday,Friday",
        email: "notify2@example.com",
        phone: "+4520123457",
        priceSignal: "DK2",
        userId,
      }
    ];

    const inserted = await Alert.insertMany(alerts);
    console.log("Alerts saved:", inserted);

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error saving alerts:", err);
  }
}

addAlerts();