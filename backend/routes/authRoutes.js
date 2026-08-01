const express = require("express");
const router = express.Router();

const {
    registerUser,
    registerOwner,
    login
} = require("../controllers/authController");

router.post("/register/user", registerUser);

router.post("/register/owner", registerOwner);

router.post("/login", login);

module.exports = router;