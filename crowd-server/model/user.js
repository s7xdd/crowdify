const mongoose = require("mongoose")
const Schema = require("mongoose").Schema

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  person: { type: String, required: true },
  walletId: { type: String, required: true },
  skinTone: { type: String, required: true },
  pose: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  bannerImage: { type: String, default: "" },
  campaigns: [{ type: Schema.Types.ObjectId, ref: "Campaign" }], 
});

const Users = mongoose.model("CrowdifyUsers", userSchema);

module.exports =  Users ;
