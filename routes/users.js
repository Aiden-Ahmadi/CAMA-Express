const express = require("express");
const { getUsers, getUserById, createUser, deleteUser, followUser, searchUsers } = require("../controllers/userController");

const router = express.Router();

// Define routes and link them to controllers
router.get("/", getUsers);         // Get all users
router.get("/:id", getUserById);   // Get a single user
router.post("/", createUser);      // Create a new user
router.delete("/:id", deleteUser); // Delete a user
router.post("/follow", followUser);
router.get("/search", searchUsers);

module.exports = router;
