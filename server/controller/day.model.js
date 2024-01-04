const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  videoIdWhy: { type:String},
  videoIdHow: { type:String},
  file:{ type:String},
});

const days = mongoose.model("day", daySchema);

module.exports = days;