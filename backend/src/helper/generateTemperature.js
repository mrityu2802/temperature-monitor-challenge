const { v4: uuidv4 } = require("uuid");

const generateTemperatureData = () => {
  const temperature = Math.floor(Math.random() * 16) + 15;
  const timestamp = new Date();
  const id = uuidv4();
  return { id, temperature, timestamp };
};

module.exports = generateTemperatureData;
