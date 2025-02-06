const mongoose = require("mongoose");

const TemperatureSchema = new mongoose.Schema({
  id: String,
  temperature: Number,
  timestamp: String,
  status: { type: String, default: "PENDING" },
  processedAt: String,
});

const Temperature = mongoose.model("Temperature", TemperatureSchema);

module.exports = Temperature;
