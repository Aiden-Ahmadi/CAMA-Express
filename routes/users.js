const express = require("express");
const { getUsers, getUserById, createUser, deleteUser, followUser, unfollowUser, searchUsers, followedUsers } = require("../controllers/userController");

const router = express.Router();

// Define routes and link them to controllers

router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/search", searchUsers);
router.get("/:id/following", followedUsers);

router.get("/", getUsers);         // Get all users
router.get("/:id", getUserById);   // Get a single user
router.post("/", createUser);      // Create a new user
router.delete("/:id", deleteUser); // Delete a user
//router.get("/search", searchUsers);

module.exports = router;
