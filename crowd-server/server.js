const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const { Campaign, Activity, User } = require("./db/schema"); // Ensure models are correctly imported

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

    // If no campaigns exist, seed data
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

    // If no activities exist, seed data
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

    // If no users exist, seed data
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
          campaigns: [], // No campaigns assigned initially
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
          campaigns: [], // No campaigns assigned initially
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

// Routes

// Get campaigns by walletId
app.get("/api/campaigns", async (req, res) => {
  const { walletId } = req.query; // Get walletId from query params

  try {
    // If walletId is provided, filter campaigns by walletId
    const filter = walletId ? { walletId } : {}; // Only filter if walletId exists
    const campaigns = await Campaign.find(filter);
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all activities
app.get("/api/activities", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a user by walletId
app.get("/api/users", async (req, res) => {
    const { walletId } = req.query; // Get walletId from query params
  
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
