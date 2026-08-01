const express = require("express");

const router = express.Router();

const {
    addHotel,
    getMyHotels,
    getSingleHotel,
    updateHotel
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

// Get Single Hotel
router.get(
    "/:id",
    verifyToken,
    isOwner,
    getSingleHotel
);

// Update Hotel
router.put(
    "/update/:id",
    verifyToken,
    isOwner,
    updateHotel
);

module.exports = router;