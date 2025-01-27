const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");


const activityRoutes = require("./Router/activityRouter");
const campaignRoutes = require("./Router/campaignRouter");



const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();


app.use("/api/activities", activityRoutes);
app.use("/api/campaigns", campaignRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

