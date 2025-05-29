const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const createUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");

        const newUser = new User({
            name: "Febin",
            email: "febin@gmail.com",
            password: "febin@123",
            userId: "febin001",
        });

        await newUser.save();
        console.log("Saved user:", newUser);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

createUser();