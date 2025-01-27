const mongoose = require("mongoose");

const Schema = require("mongoose").Schema;

const activitySchema = new Schema({
  // user: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  description: { type: String, required: true },
  amount: { type: String, required: true }, // Store as String for amounts like "$598.09"
});

const Activity = mongoose.model("CrowdifyActivity", activitySchema);
module.exports =  Activity ;
