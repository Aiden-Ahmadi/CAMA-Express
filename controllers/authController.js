const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // Replace with an environment variable

// ✅ Register a New User
const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already in use" });
  
      // Create and save new user
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });
  
      res.status(201).json({ token, user: { id: newUser._id, username: newUser.username } });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  

// ✅ Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { id: user._id, username: user.username, profileImage: user.profileImage } });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
