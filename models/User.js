const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String, default: "" }, // Optional profile picture
  bio: { type: String, default: "" }, // User bio
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
