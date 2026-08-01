const express = require("express");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, (req, res) => {

    res.status(200).json({

        success: true,

        message: "Profile Loaded Successfully",

        user: req.user

    });

});

module.exports = router;