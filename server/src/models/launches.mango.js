const mongoose = require("mongoose");
const launchesSchema = mongoose.Schema({
  flightNumber: Number,
  launchDate: Date,
  mission: String,
  rocket: String,
  target: String,
  customers: [String],
  upcoming: Boolean,
  success: Boolean,
});

const model = mongoose.model("Launche", launchesSchema);

module.exports = model;
