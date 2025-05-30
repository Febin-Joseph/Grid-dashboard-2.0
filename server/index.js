const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alerts");
const powerDataRoutes = require("./routes/powerData");
const { authLimiter, apiLimiter } = require('./middleware/rateLimit');
const { securityMiddleware } = require('./middleware/security');
const Visit = require('./models/Visit');

const app = express();
const PORT = process.env.PORT || 5000;

app.enable('trust proxy');
app.set('trust proxy', true);

app.use(express.json());
app.use(cors({
  origin: "https://grid-dashboard-2-0.vercel.app",
  credentials: true
}))
app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    await Visit.create({
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
  } catch (err) {
    console.error("Failed to log visit:", err.message);
  }
  next();
});

// Security
app.use(securityMiddleware);

// MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

connectDB()

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/alerts", apiLimiter, alertRoutes);
app.use("/api/power-data", apiLimiter, powerDataRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});