const express = require("express");

const router = express.Router();

const {
    bookRoom,
    getMyBookings,
    cancelBooking
} = require("../controllers/bookingController");

const {
    verifyToken
} = require("../middleware/authMiddleware");

const allowBooking = require("../middleware/bookingAccess");

// ===============================
// Book Room
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

// ===============================
// Cancel Booking
// ===============================

router.put(
    "/cancel/:id",
    verifyToken,
    cancelBooking
);

module.exports = router;