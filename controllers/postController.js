const Post = require("../models/Post");
const User = require("../models/User");

const getUserPosts = async (req, res) => {
    try {
      const posts = await Post.find({ userId: req.params.id }).sort({ createdAt: -1 });
        if (!posts) return res.status(404).json({ message: "User not found" });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }

}
const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.params; // The client making the request

    // Get list of users the client follows
    const user = await User.findById(userId).select("followingIds");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch posts only from users in the `following` list
    const posts = await Post.find({ userId: { $in: user.followingIds } })
      .populate("userId", "username profileImage")
      .sort({ createdAt: -1 }); // Show newest first

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createPost = async (req, res) => {
    try{
        const {userId, caption, imageUrls} = req.body;
        const newPost = new Post({userId, caption, imageUrls})
        await newPost.save();
        res.status(201).json(newPost);
    }catch (error){
        console.log(error);
        res.status(500).json({error: "Server error"});
    }
}
const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedPost = await Post.findByIdAndDelete(id);
  
      if (!deletedPost) return res.status(404).json({ message: "Post not found" });
  
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };


module.exports = {getUserPosts, createPost, deletePost, getFeedPosts};