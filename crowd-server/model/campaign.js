const mongoose = require("mongoose")
const Schema = require("mongoose").Schema

const campaignSchema = new Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
    walletId: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: String, required: true },
    donations: { type: Number, required: true },
    progress: { type: Number, required: true },
  });
  
  const Campaign = mongoose.model("CrowdifyCampaign", campaignSchema);

  module.exports = { Campaign };

