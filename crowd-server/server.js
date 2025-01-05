const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const { Campaign, Activity, User } = require("./db/schema"); // Ensure models are correctly imported
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Seeding function to add initial data
const seedDatabase = async () => {
  try {
    // Check if there are campaigns, activities, or users already in the database
    const campaignCount = await Campaign.countDocuments();
    const activityCount = await Activity.countDocuments();
    const userCount = await User.countDocuments();

    if (campaignCount === 0) {
      const campaigns = [
        {
          title: "Campaign 1",
          owner: "Owner 1",
          walletId: "0x12345",
          image: "https://example.com/campaign1.jpg",
          description: "Campaign description here",
          amount: "€1000",
          donations: 500,
          progress: 50,
        },
        {
          title: "Campaign 2",
          owner: "Owner 2",
          walletId: "0x67890",
          image: "https://example.com/campaign2.jpg",
          description: "Campaign description here",
          amount: "€3000",
          donations: 1500,
          progress: 50,
        },
      ];
      await Campaign.insertMany(campaigns);
      console.log("Campaigns seeded.");
    }

    if (activityCount === 0) {
      const activities = [
        {
          user: "User 1",
          description: "Donated $100 to Campaign 1",
          amount: "$100",
        },
        {
          user: "User 2",
          description: "Donated $200 to Campaign 2",
          amount: "$200",
        },
      ];
      await Activity.insertMany(activities);
      console.log("Activities seeded.");
    }

    if (userCount === 0) {
      const users = [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          person: "John's Person",
          walletId: "0x12345",
          skinTone: "light",
          pose: "smiling",
          gender: "male",
          location: "USA",
          bannerImage: "https://example.com/banner1.jpg",
          campaigns: [],
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          person: "Jane's Person",
          walletId: "0x67890",
          skinTone: "dark",
          pose: "serious",
          gender: "female",
          location: "Canada",
          bannerImage: "https://example.com/banner2.jpg",
          campaigns: [],
        },
      ];
      await User.insertMany(users);
      console.log("Users seeded.");
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Call the seed function
seedDatabase();

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
app.post("/api/campaigns", upload.single("image"), async (req, res) => {
    try {
      const { title, walletId, description, amount, donations, progress } = req.body;
      const image = req.file ? req.file.path : null;
  
      // Find the user by walletId to get the full name
      const user = await User.findOne({ walletId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
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
