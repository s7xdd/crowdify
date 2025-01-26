// // backend/models.js
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Campaign Schema
// const campaignSchema = new Schema({
//   title: { type: String, required: true },
//   owner: { type: String, required: true },
//   walletId: { type: String, required: true },
//   image: { type: String, required: true },
//   description: { type: String, required: true },
//   amount: { type: String, required: true }, // Store as String to accommodate the "" symbol
//   donations: { type: Number, required: true },
//   progress: { type: Number, required: true },
// });

// // Activity Schema
// const activitySchema = new Schema({
//   user: { type: String, required: true },
//   description: { type: String, required: true },
//   amount: { type: String, required: true }, // Store as String for amounts like "$598.09"
// });

// // User Schema
// const userSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   person: { type: String, required: true },
//   walletId: { type: String, required: true },
//   skinTone: { type: String, required: true },
//   pose: { type: String, required: true },
//   gender: { type: String, required: true },
//   location: { type: String, required: true },
//   bannerImage: { type: String, default: "" },
//   campaigns: [{ type: Schema.Types.ObjectId, ref: "Campaign" }], // Reference to the Campaign collection
// });

// // Create models for the schemas
// const Campaign = mongoose.model("CrowdifyCampaign", campaignSchema);
// const Activity = mongoose.model("CrowdifyActivity", activitySchema);
// const User = mongoose.model("CrowdifyUsers", userSchema);

// // Export the models for use in other parts of the app
// module.exports = { Campaign, Activity, User };
