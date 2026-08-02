const express = require("express");
const router = express.Router();

const {

    registerUser,

    registerOwner,

    login,

    getProfile,

    updateProfile

} = require("../controllers/authController");

const {

    verifyToken

} = require("../middleware/authMiddleware");

router.post("/register/user", registerUser);

router.post("/register/owner", registerOwner);

router.post("/login", login);

// ==============================
// Profile
// ==============================

router.get(

    "/profile",

    verifyToken,

    getProfile

);

router.put(

    "/update-profile",

    verifyToken,

    updateProfile

);

module.exports = router;