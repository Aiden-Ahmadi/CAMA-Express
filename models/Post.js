const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who made the post,
  caption: { type: String, default: "" }, // Post caption
  imageUrls: [{ type: String, required: true }], // Array of image URLs
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the post
  createdAt: { type: Date, default: Date.now }
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // Only hash if password is changed
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = mongoose.model("Post", postSchema);
