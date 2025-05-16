const User = require("../models/User");


const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


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
    console.log("start of search");
    const { username } = req.query;
    console.log(username);
    const users = await User.find({ username: { $regex: username, $options: "i" } }).select("_id username");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error in search Users" });
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
const unfollowUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;


    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({ message: "User not found" });
    }

    // Unadd followingId to follower's following list
    if (follower.followingIds.includes(followingId)) {
      await User.updateOne(
        { _id: followerId },
        { $pull: { followingIds: followingId } } 
      )
    }

    // unAdd followerId to following's followers list
    if (following.followerIds.includes(followerId)) {
      await User.updateOne(
        { _id: followingId },
        { $pull: { followingIds: followerId } } 
      )
    }

    res.json({ message: "User unfollowed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
const followedUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("followingIds", "_id username");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.followingIds);
    } catch (error) {
        console.error("Error fetching following list:", error);
        res.status(500).json({ error: "Server error" });
    }
}


// Export all functions
module.exports = { getUsers, getUserById, createUser, deleteUser, followUser, unfollowUser, searchUsers, followedUsers };
