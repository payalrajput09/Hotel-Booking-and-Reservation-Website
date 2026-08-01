// Import Packages
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

// Import Database
const connectDB = require("./config/db");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);




// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Server is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});