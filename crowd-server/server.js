const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const { Campaign } = require("./model/campaign");
const { Activity } = require("./model/activity");
const { User } = require("./model/user");
const activityRoutes = require("./routes/ActivityRoutes");

const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/activities", activityRoutes);


// Get all activities
app.get("/api/activities", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a campaign
app.post("/api/campaigns", async (req, res) => {
    try {
      const { title, walletId, description, amount, donations, progress, image } = req.body;
  
      // Find the user by walletId to get the full name
      let user = await User.findOne({ walletId });
      if (!user) {
        const newUser = new User({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          person: "John Doe",
          walletId,
          skinTone: "White",
          pose: "1 Happy",
          gender: "Male",
          location: "New York, USA",
          bannerImage: "",
          campaigns: [],
        });
        user = await newUser.save();
        console.log(`Created new user with walletId ${walletId}`);
      }
  
      // Set the owner field using the user's full name
      const owner = `${user.firstName} ${user.lastName}`;
  
      // Create a new campaign
      const newCampaign = new Campaign({
        title,
        owner,
        walletId,
        description,
        image,
        amount,
        donations,
        progress,
      });
  
      const savedCampaign = await newCampaign.save();
  
      // Add the campaign to the user's list of campaigns
      user.campaigns.push(savedCampaign._id);
      await user.save();
  
      res.status(201).json(savedCampaign);
    } catch (err) {
      res.status(500).json({ message: "Error creating campaign", error: err.message });
    }
  });
  

// Get campaigns by walletId
// Get campaigns (all or by walletId)
app.get("/api/campaigns", async (req, res) => {
    const { walletId } = req.query;
  
    try {
      let campaigns;
  
      if (walletId) {
        // Fetch campaigns by walletId
        campaigns = await Campaign.find({ walletId });
      } else {
        // Fetch all campaigns
        campaigns = await Campaign.find();
      }
  
      console.log("Campaigns Fetched:", campaigns); // Log fetched campaigns
      res.json(campaigns);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      res.status(500).json({ message: err.message });
    }
  });

// Delete a campaign
app.delete("/api/campaigns/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
      // Find the campaign by id and delete it
      const campaign = await Campaign.findByIdAndDelete(id);
      
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
  
      await User.updateMany(
        { campaigns: id },
        { $pull: { campaigns: id } } 
      );
  
      res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting campaign", error: err.message });
    }
  });
  
  

// Get a user by walletId
app.get("/api/users", async (req, res) => {
  const { walletId } = req.query;
  console.log("Query Params:", req.query); // Log walletId

  try {
    const user = await User.find({ walletId });
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user's profile
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
