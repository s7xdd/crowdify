// backend/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://admin:admin@cluster0.jwp5ppo.mongodb.net/"; // Your MongoDB URI (local or MongoDB Atlas)
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
