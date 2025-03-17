const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  followerIds: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  followingIds: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  profileImage: { type: String, default: "" }, // Optional profile picture
  bio: { type: String, default: "" }, // User bio
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
