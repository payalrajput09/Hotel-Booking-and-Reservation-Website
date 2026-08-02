const express = require("express");

const router = express.Router();

const {

    ownerDashboard

} = require("../controllers/dashboardController");

const {

    verifyToken

} = require("../middleware/authMiddleware");

router.get(

    "/owner",

    verifyToken,

    ownerDashboard

);

module.exports = router;