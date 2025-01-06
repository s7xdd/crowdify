const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const { Campaign, Activity, User } = require("./db/schema"); 
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Create or fetch user when wallet connects
app.post("/api/users/connect-wallet", async (req, res) => {
  const { walletId } = req.body;

  if (!walletId) {
    return res.status(400).json({ message: "Wallet ID is required." });
  }

  try {
    let user = await User.findOne({ walletId });

    if (!user) {
      user = new User({
        walletId,
        firstName: "Default",
        lastName: "User",
        email: `${walletId}@example.com`,
        person: "Individual",
        skinTone: "Default",
        pose: "Default",
        gender: "Unknown",
        location: "Unknown",
      });

      await user.save();
      console.log(`New user created for wallet: ${walletId}`);
    } else {
      console.log(`User already exists for wallet: ${walletId}`);
    }

    res.status(200).json(user); 
  } catch (err) {
    console.error("Error creating/fetching user:", err);
    res.status(500).json({ message: "Error processing request", error: err.message });
  }
});


const ensureUserExists = async (req, res, next) => {
  const { walletId, firstName, lastName, email, person, skinTone, pose, gender, location } = req.body;

  if (!walletId) {
    return res.status(400).json({ message: "Wallet ID is required." });
  }

  try {
    let user = await User.findOne({ walletId });

    if (!user) {
      user = new User({
        walletId,
        firstName: firstName || "Default",
        lastName: lastName || "User",
        email: email || `${walletId}@example.com`,
        person: person || "Individual",
        skinTone: skinTone || "Default",
        pose: pose || "Default",
        gender: gender || "Unknown",
        location: location || "Unknown",
      });
      await user.save();
      console.log(`Created new user for walletId: ${walletId}`);
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Error checking/creating user", error: err.message });
  }
};


app.get("/api/activities", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a campaign
// app.post("/api/campaigns", upload.single("image"), async (req, res) => {
//     try {
//       const { title, walletId, description, amount, donations, progress } = req.body;
//       const image = req.file ? req.file.path : null;
  
//       // Find the user by walletId to get the full name
//       const user = await User.findOne({ walletId });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       // Set the owner field using the user's full name
//       const owner = `${user.firstName} ${user.lastName}`;
  
//       // Create a new campaign
//       const newCampaign = new Campaign({
//         title,
//         owner,
//         walletId,
//         description,
//         image,
//         amount,
//         donations,
//         progress,
//       });
  
//       const savedCampaign = await newCampaign.save();
  
//       // Add the campaign to the user's list of campaigns
//       user.campaigns.push(savedCampaign._id);
//       await user.save();
  
//       res.status(201).json(savedCampaign);
//     } catch (err) {
//       res.status(500).json({ message: "Error creating campaign", error: err.message });
//     }
//   });

app.post("/api/campaigns", upload.single("image"), ensureUserExists, async (req, res) => {
  try {
    const { title, walletId, description, amount, donations, progress } = req.body;
    const image = req.file ? req.file.path : null;

   
    const user = req.user;
    const owner = `${user.firstName} ${user.lastName}`;

   
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

    user.campaigns.push(savedCampaign._id);
    await user.save();

    res.status(201).json(savedCampaign);
  } catch (err) {
    res.status(500).json({ message: "Error creating campaign", error: err.message });
  }
});

  

app.get("/api/campaigns", async (req, res) => {
    const { walletId } = req.query;
  
    try {
      let campaigns;
  
      if (walletId) {
        campaigns = await Campaign.find({ walletId });
      } else {
        campaigns = await Campaign.find();
      }
  
      console.log("Campaigns Fetched:", campaigns); 
      res.json(campaigns);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      res.status(500).json({ message: err.message });
    }
  });

app.delete("/api/campaigns/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
