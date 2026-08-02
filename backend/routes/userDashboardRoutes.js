const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const { isUser } = require("../middleware/roleMiddleware");

const { userDashboard } = require("../controllers/userDashboardController");

// User Dashboard
router.get(
    "/dashboard",
    verifyToken,
    isUser,
    userDashboard
);

module.exports = router;