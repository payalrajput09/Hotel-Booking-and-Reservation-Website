const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const { isOwner } = require("../middleware/roleMiddleware");

router.get(
    "/dashboard",
    verifyToken,
    isOwner,
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Welcome Owner Dashboard",
            user: req.user
        });

    }
);

module.exports = router;