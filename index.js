const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
const cloudinary = require("cloudinary").v2;
cloudinary.config(); // Reads CLOUDINARY_URL from .env


const app = express();
app.use(cors()); // Allow frontend to access API
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Import routes
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const cloudinaryRoutes = require("./routes/cloudinary");
app.use("/users", userRoutes); // Use users.js routes
app.use("/posts", postRoutes)
app.use("/auth", authRoutes);
app.use("/cloudinary", cloudinaryRoutes);
// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Express API with MongoDB!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
