require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./lib/db.js");
const generateTemperatureData = require("./helper/generateTemperature.js");
const processTemperature = require("./services/processTemperature.js");
const Temperature = require("./models/temperature.model.js");
const getTemperatureRecords = require("./services/GetTemperature.js");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("client disconnected", socket.id);
  });
});

setInterval(async () => {
  const reading = generateTemperatureData();
  const newReading = new Temperature(reading);
  newReading.save();

  const totalRecords = await Temperature.countDocuments();
  if (totalRecords > 5) {
    const latestRecords = await Temperature.find()
      .sort({ timestamp: -1 }) 
      .limit(5); 

    const latestIds = latestRecords.map((record) => record._id);

    await Temperature.deleteMany({
      _id: { $nin: latestIds },
    });
  }

  io.emit("temperature_reading", reading);
  const records = await getTemperatureRecords();
  io.emit("rocords", records);
  processTemperature(io, reading);
}, 2000);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
