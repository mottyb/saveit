const mongoose = require("mongoose");
require("./family.model");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  total_save:{type: Number, default :0},
  isPopupSave:{type: Boolean, default :false},
  my_family: { type: mongoose.Schema.Types.ObjectId,ref:"family" },
  isActive: { type: Boolean, default: true },
  avatar:{type: String},
  role:{type: String, default:'user'}
});

const users = mongoose.model("user", userSchema);

module.exports = users;