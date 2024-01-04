const mongoose = require("mongoose");
require("./family.model");

const teamChallengeSchema = new mongoose.Schema({
  dayNumber:{type:Number,default:0},
  date:{type:Date,default:new Date()},
  team_family: [{ type: mongoose.Schema.Types.ObjectId,ref:"family" }],
  isActive: { type: Boolean, default: true },
  isMain: { type: Boolean, default: true },
});

const teamChallenges = mongoose.model("teamChallenge", teamChallengeSchema);

module.exports = teamChallenges;