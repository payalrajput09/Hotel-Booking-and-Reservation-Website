const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/profile", verifyToken, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Profile Loaded Successfully",
        user: req.user
    });

});

module.exports = router;