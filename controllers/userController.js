const User = require("../models/User");

// ✅ Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get a User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Create a New User
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required" });
    }

    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Delete a User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { username } = req.query;
    const users = await User.find({ username: { $regex: username, $options: "i" } }).select("_id username");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

const followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add followingId to follower's following list
    if (!follower.followingIds.includes(followingId)) {
      follower.followingIds.push(followingId);
      await follower.save();
    }

    // Add followerId to following's followers list
    if (!following.followerIds.includes(followerId)) {
      following.followerIds.push(followerId);
      await following.save();
    }

    res.json({ message: "User followed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}


// Export all functions
module.exports = { getUsers, getUserById, createUser, deleteUser, followUser, searchUsers };
