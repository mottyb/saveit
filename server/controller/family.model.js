const mongoose = require("mongoose");
require("./user.model");

const familySchema = new mongoose.Schema({
  familyName: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  email: {
    type: String,
  },
  total_save:{type: Number, default :0},
  my_family: [{ type: mongoose.Schema.Types.ObjectId,ref:"user" }],
  teamChallenge:{ type: mongoose.Schema.Types.ObjectId,ref:"challenge" },
  isActive: { type: Boolean, default: true },
});

const familys = mongoose.model("family", familySchema);

module.exports = familys;