const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Owner = require("../models/Owner");
const registerUser = async (req, res) => {
    try {
         console.log(req.body);
        const {
            fullName,
            email,
            phone,
            password,
            country,
            state,
            city
        } = req.body;

        // Check Empty Fields
        if (
            !fullName ||
            !email ||
            !phone ||
            !password ||
            !country ||
            !state ||
            !city
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check Existing User
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
            country,
            state,
            city
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};


const registerOwner = async (req, res) => {
    try {

        const {
            fullName,
            email,
            phone,
            password,
            country,
            state,
            city
        } = req.body;

        // Check Empty Fields
        if (
            !fullName ||
            !email ||
            !phone ||
            !password ||
            !country ||
            !state ||
            !city
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check Existing Owner
        const existingOwner = await Owner.findOne({
            email
        });

        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Owner
        const newOwner = new Owner({
            fullName,
            email,
            phone,
            password: hashedPassword,
            country,
            state,
            city
        });

        await newOwner.save();

        res.status(201).json({
            success: true,
            message: "Owner Registered Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const loginOwner = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // Find Owner
        const owner = await Owner.findOne({ email });

        if (!owner) {
            return res.status(404).json({
                success: false,
                message: "Owner not found"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, owner.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: owner._id,
                role: owner.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Owner Login Successful",
            token,
            owner: {
                id: owner._id,
                fullName: owner.fullName,
                email: owner.email,
                role: owner.role,
                isVerified: owner.isVerified
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and Password are required."
            });

        }


        // =============================
        // CHECK USER COLLECTION
        // =============================

        let account = await User.findOne({ email });


        // =============================
        // CHECK OWNER COLLECTION
        // =============================

        if (!account) {

            account = await Owner.findOne({ email });

        }


        // =============================
        // ACCOUNT NOT FOUND
        // =============================

        if (!account) {

            return res.status(404).json({

                success: false,
                message: "Account not found."

            });

        }


        // =============================
        // PASSWORD CHECK
        // =============================

        const isMatch = await bcrypt.compare(
            password,
            account.password
        );


        if (!isMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid Password."

            });

        }


        // =============================
        // GENERATE JWT TOKEN
        // =============================

        const token = jwt.sign(

            {

                id: account._id,
                role: account.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );


        // =============================
        // SUCCESS RESPONSE
        // =============================

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: account._id,
                fullName: account.fullName,
                email: account.email,
                role: account.role

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ======================================
// Get Profile
// ======================================

const getProfile = async (req, res) => {

    try {

        let user;

        if (req.user.role === "user") {

            user = await User.findById(req.user.id).select("-password");

        } else {

            user = await Owner.findById(req.user.id).select("-password");

        }

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User Not Found"

            });

        }

        res.status(200).json({

            success: true,
            user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ======================================
// Update Profile
// ======================================

const updateProfile = async (req, res) => {

    try {

        const {

            fullName,
            phone,
            country,
            state,
            city

        } = req.body;

        let user;

        if (req.user.role === "user") {

            user = await User.findById(req.user.id);

        } else {

            user = await Owner.findById(req.user.id);

        }

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User Not Found"

            });

        }

        user.fullName = fullName;
        user.phone = phone;
        user.country = country;
        user.state = state;
        user.city = city;

        await user.save();

        res.status(200).json({

            success: true,
            message: "Profile Updated Successfully",
            user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    registerUser,

    registerOwner,

    login,

    getProfile,

    updateProfile

};