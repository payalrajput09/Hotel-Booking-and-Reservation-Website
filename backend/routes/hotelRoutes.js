const express = require("express");

const router = express.Router();

const {

    addHotel,

    getMyHotels,

    getSingleHotel,

    updateHotel,

    deleteHotel,

    getAllHotels,

    getHotelDetails

} = require("../controllers/hotelController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isOwner } = require("../middleware/roleMiddleware");


// Add Hotel
router.post("/add", verifyToken, isOwner, addHotel);

// ===============================
// User - Get All Hotels
// ===============================

router.get(
    "/",
    verifyToken,
    getAllHotels
);

// ===============================
// User - Hotel Details
// ===============================

router.get(
    "/details/:id",
    verifyToken,
    getHotelDetails
);

// ===============================
// Owner - Get My Hotels
// ===============================

router.get(
    "/my-hotels",
    verifyToken,
    isOwner,
    getMyHotels
);

// ===============================
// Owner - Get Single Hotel
// ===============================

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

// Delete Hotel
router.delete(
    "/delete/:id",
    verifyToken,
    isOwner,
    deleteHotel
);

module.exports = router;