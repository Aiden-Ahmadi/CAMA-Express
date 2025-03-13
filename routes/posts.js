const express = require("express");
const { getUserPosts, createPost, deletePost, getFeedPosts } = require("../controllers/postController");

const router = express.Router();

// Define routes and link them to controllers      // Get all users
router.get("/:id", getUserPosts);   // Get a single user
router.get("/feed/:userId", getFeedPosts); // Get posts from followed users
router.post("/", createPost);      // Create a new user
router.delete("/:id", deletePost); // Delete a user

module.exports = router;
