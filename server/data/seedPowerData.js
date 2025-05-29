const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Power = require("../models/Power");

dotenv.config();

const seedPowerData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");

        await Power.deleteMany({});

        const powerData = [];

        // Creating variations in power chart line
        for (let i = 0; i < 24; i++) {
            const hour = i.toString().padStart(2, "0") + ":00"
            powerData.push({
                hour,
                dk1Value: Number((49.8 + Math.random() * 0.4).toFixed(2)),
                dk2Value: Number((49.9 + Math.random() * 0.3).toFixed(2)),
                dkGasValue: Number((50.0 + Math.random() * 0.2).toFixed(2)),
            });
        }

        await Power.insertMany(powerData);
        console.log("Power data seeded successfully");

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error seeding power data:", error);
        process.exit(1);
    }
}

seedPowerData();