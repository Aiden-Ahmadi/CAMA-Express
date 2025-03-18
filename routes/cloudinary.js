const express = require("express");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const router = express.Router();

// Configure Cloudinary (API credentials from .env)
cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  });

// Generate a signed upload signature
router.get("/generate-signature", (req, res) => {
    console.log("start");
  const timestamp = Math.round(new Date().getTime() / 1000);
  console.log("After Date");
  
  // Generate a signature using the secret key
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, upload_preset: "Post" },
    process.env.API_SECRET
  );
  console.log(timestamp);
  console.log(signature);
  console.log(process.env.API_KEY);

  // Send the signature, timestamp, and API key to the frontend
  res.json({ timestamp, signature, api_key: process.env.API_KEY });
});

module.exports = router;
