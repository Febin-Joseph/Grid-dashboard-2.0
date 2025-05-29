const express = require("express");
const auth = require("../middleware/auth");
const Power = require("../models/Power");

const router = express.Router();

// Get power data
router.get("/", auth, async (req, res) => {
  try {
    const powerData = await Power.find().sort({ hour: 1 });

    const formattedData = {
      categories: powerData.map((record) => record.hour),
      series: [
        {
          name: "DK-1",
          data: powerData.map((record) => record.dk1Value),
        },
        {
          name: "DK-2",
          data: powerData.map((record) => record.dk2Value),
        },
        {
          name: "DK-Gas",
          data: powerData.map((record) => record.dkGasValue),
        },
      ],
    }

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching power data:", error);
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = router;