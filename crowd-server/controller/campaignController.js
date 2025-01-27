const Users= require("../model/user");
const Campaign = require("../model/campaign");
const Activity = require("../model/activity");
// const mongoose = require("mongoose");

// Handles the GET request for retrieving activities
exports.getActivities = async (req, res) => {
    console.log("Inside getActivities");
    try {
      console.log("Fetching activities...");
      const activities = await Activity.find();
      console.log("Activities fetched:", activities);
      res.json(activities);
    } catch (err) {
      console.error("Error fetching activities:", err);
      res.status(500).json({ message: "Error fetching activities" });
    }
  };


    // Handles the POST request for creating a new campaign
 
  exports.postCampaigns = async (req, res) => {
    console.log("inside post campaign");
    
    try {
      const { title, walletId, description, amount, donations, progress, image } = req.body;
  
      if (!title || !walletId || !description || !amount || !image) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }
  
      // Check if the user already exists by walletId
      let user = await Users.findOne({ walletId });
      if (!user) {
        // Ensure the email is unique to avoid duplication
        const uniqueEmail = `user_${walletId}@example.com`;
  
        user = new Users({
          firstName: "John",
          lastName: "Doe",
          email: uniqueEmail,
          person: "John Doe",
          walletId,
          skinTone: "White",
          pose: "1 Happy",
          gender: "Male",
          location: "New York, USA",
          bannerImage: "",
          campaigns: [],
        });
  
        await user.save();
        console.log(`Created new user with walletId ${walletId}`);
      }
  
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
      console.error("Error creating campaign:", err);
      res.status(500).json({ message: "Error creating campaign", error: err.message });
    }
  };
  
  

// Handles the GET request for retrieving campaigns
  exports.getCampaigns = async (req, res) => {
    console.log("Inside getCampaigns");
    
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
      res.status(500).json({ message: "Error fetching campaigns" });
    }
  }


//   Handles the DELETE request for deleting a campaign
exports.deleteCampaign = async (req, res) => {
    console.log("Inside deleteCampaign");

    const { id } = req.params;
    console.log("Campaign ID:", id);

    // Check if the campaign ID is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ message: "Invalid campaign ID format" });
    // }

    try {
        // Find the campaign by ID and delete it
        const campaign = await Campaign.findByIdAndDelete(id);
        console.log("Found campaign:", campaign);

        if (campaign) {
            await Users.updateMany(
                { campaigns: id },
                { $pull: { campaigns: id } }
            );
    
            res.status(200).json({ message: "Campaign deleted successfully" });
            
        }
        return res.status(404).json({ message: "Campaign not found" });

        // Update users who have this campaign and remove it from their list
    } catch (err) {
        console.error("Error deleting campaign:", err);
        res.status(500).json({ message: "Error deleting campaign", error: err });
    }
};



    // Handles the GET request for retrieving users
    exports.getUsers=async (req, res) => {
      const { walletId } = req.query;
      console.log("Query Params:", req.query); // Log walletId
    
      try {
        const user = await Users.find({ walletId });
        if (user.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Error fetching user" });
      }
    }

    exports.updateUser=async (req, res) => {
        const { id } = req.params;
      
        try {
          const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
          res.json(updatedUser);
        } catch (err) {
          console.error("Error updating user:", err);
          res.status(500).json({ message: "Error updating user" });
        }
      }

      exports.updateCampaign=async (req, res) => {
        const { id } = req.params;
      
        try {
          const updatedCampaign = await Campaign.findByIdAndUpdate(id, req.body, { new: true });
          if (!updatedCampaign) {
            return res.status(404).json({ message: "Campaign not found" });
          }
          res.json(updatedCampaign);
        } catch (err) {
          console.error("Error updating campaign:", err);
          res.status(500).json({ message: "Error updating campaign" });
        }
      }

