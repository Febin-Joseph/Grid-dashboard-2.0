const Visit = require("../models/Visit");

app.get("/api/visits", async (req, res) => {
  try {
    const visits = await Visit.find().sort({ timestamp: -1 });

    const formattedVisits = visits.map(v => ({
      ip: v.ip,
      userAgent: v.userAgent,
      timestamp: new Date(v.timestamp).toLocaleString(),
    }));

    res.json({
      totalVisits: await Visit.countDocuments(),
      visits: formattedVisits
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get visits" });
  }
});