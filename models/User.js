const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  password: String,
  membershipStatus: Boolean,
  admin: Boolean,
});

module.exports = mongoose.model("User", userSchema);
