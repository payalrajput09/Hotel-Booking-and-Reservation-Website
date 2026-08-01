console.log("✅ Room Routes Loaded");
const express = require("express");
const router = express.Router();

const {
    addRoom,
    getMyRooms,
    getSingleRoom,
    updateRoom
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

// Get Single Room
router.get(
    "/:id",
    verifyToken,
    isOwner,
    getSingleRoom
);

// Update Room
router.put(
    "/:id",
    verifyToken,
    isOwner,
    updateRoom
);

module.exports = router;