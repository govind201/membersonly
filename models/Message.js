const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: String,
  timestamp: Date,
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", messageSchema);
