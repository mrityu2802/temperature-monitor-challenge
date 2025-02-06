const Temperature = require("../models/temperature.model");

const getTemperatureRecords = async () => {
  try {
    const res = await Temperature.find().sort({ timestamp: -1 }).skip(1);
    return res;
  } catch (error) {
    console.error("Error fetching temperature:", error);
    return [];
  }
};

module.exports = getTemperatureRecords;
