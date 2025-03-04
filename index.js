const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to access API
app.use(express.json()); // Parse JSON request bodies

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Express on Render!");
});

// Deploy on Render's default port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
