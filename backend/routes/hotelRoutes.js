const express = require("express");

const router = express.Router();

const {
    addHotel
} = require("../controllers/hotelController");

const { verifyToken } = require("../middleware/authMiddleware");

const { isOwner } = require("../middleware/roleMiddleware");


console.log("verifyToken =", verifyToken);
console.log("isOwner =", isOwner);
console.log("addHotel =", addHotel);
// Add Hotel
router.post(
    "/add",
    verifyToken,
    isOwner,
    addHotel
);

module.exports = router;