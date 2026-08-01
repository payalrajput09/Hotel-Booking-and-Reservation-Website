console.log("✅ Room Routes Loaded");
const express = require("express");
const router = express.Router();

const {
    addRoom,
    getMyRooms
} = require("../controllers/roomController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isOwner } = require("../middleware/roleMiddleware");

// Add Room
router.post(
    "/add",
    verifyToken,
    isOwner,
    addRoom
);

// Get All Rooms
router.get(
    "/",
    verifyToken,
    isOwner,
    getMyRooms
);

module.exports = router;