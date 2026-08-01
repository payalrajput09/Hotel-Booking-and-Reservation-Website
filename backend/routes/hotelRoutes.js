const express = require("express");

const router = express.Router();

const {
    addHotel,
    getMyHotels
} = require("../controllers/hotelController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isOwner } = require("../middleware/roleMiddleware");

// Add Hotel
router.post(
    "/add",
    verifyToken,
    isOwner,
    addHotel
);

// Get My Hotels
router.get(
    "/my-hotels",
    verifyToken,
    isOwner,
    getMyHotels
);

module.exports = router;