const express = require("express");
const Joi = require("joi");
const Alert = require("../models/Alert");
const auth = require("../middleware/auth");

const router = express.Router();

const alertSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  criteria: Joi.string().valid("Greater", "Less").required(),
  value: Joi.number().required(),
  days: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\d+$/)
    .min(10)
    .message('Phone number must only contain digits and be at least 10 digits long')
    .required(),
});

// All Alerts for authenticated Users
router.get("/", auth, async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(alerts)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
});

// Create new Alert
router.post("/", auth, async (req, res) => {
  try {
    const { error } = alertSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const alertData = {
      ...req.body,
      userId: req.user._id,
    }

    const alert = new Alert(alertData);
    await alert.save();

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

// Delete Alert
router.delete("/:id", auth, async (req, res) => {
  try {
    const alert = await Alert.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: "Alert deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

// Update alert
router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = alertSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const alert = await Alert.findOneAndUpdate({
      _id: req.params.id,
      userId: req.user._id
    }, req.body, { new: true });

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = router;