const express = require("express");

const router = express.Router();

const {

    bookRoom,

    getMyBookings

} = require("../controllers/bookingController");

const {
    verifyToken
} = require("../middleware/authMiddleware");

const allowBooking = require("../middleware/bookingAccess");

// ===============================
// Book Room (User + Owner)
// ===============================

router.post(
    "/book",
    verifyToken,
    allowBooking,
    bookRoom
);

// ===============================
// My Bookings
// ===============================

router.get(

    "/my-bookings",

    verifyToken,

    getMyBookings

);

module.exports = router;