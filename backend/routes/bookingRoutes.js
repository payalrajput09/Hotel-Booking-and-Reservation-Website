const express = require("express");

const router = express.Router();

const {

    bookRoom,

    getMyBookings,

    cancelBooking,

    getOwnerBookings,

    acceptBooking,

    rejectBooking

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


// ======================================
// Owner Bookings
// ======================================

router.get(

    "/owner-bookings",

    verifyToken,

    getOwnerBookings

);



// ======================================
// Accept Booking
// ======================================

router.put(

    "/accept/:id",

    verifyToken,

    acceptBooking

);


// ======================================
// Reject Booking
// ======================================

router.put(

    "/reject/:id",

    verifyToken,

    rejectBooking

);



module.exports = router;