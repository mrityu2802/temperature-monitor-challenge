const axios = require("axios");
const Temperature = require("../models/temperature.model");
const processTemperature = async (io, reading) => {
  try {
    let response;
    if (process.env.USE_N8N === "true") {
      const res = await axios.post(process.env.N8N_WEBHOOK_URL, reading);
      response = {
        data: {
          success: true,
          reading: { ...res.data, processedAt: new Date() },
        },
      };
    } else {
      const status = reading.temperature > 25 ? "HIGH" : "NORMAL";
      response = {
        data: {
          success: true,
          reading: { ...reading, status, processedAt: new Date() },
        },
      };
    }

    if (response.data.success) {
      const processedReading = response.data.reading;
      await Temperature.findOneAndUpdate(
        { id: processedReading.id },
        {
          status: processedReading.status,
          processedAt: processedReading.processedAt,
        },
        { new: true }
      );
      io.emit("processed_reading", processedReading);
    } else {
      console.error("Processing failed:", response.data);
    }
  } catch (error) {
    console.error("Error processing temperature:", error);
  }
};

module.exports = processTemperature;
