const mongoose = require("mongoose");

let isConnected = false;

async function handleDatabase() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URL);

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

module.exports = { handleDatabase };
