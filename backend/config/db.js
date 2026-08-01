const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
        success: false,
        message: error.message
    });
}
};

module.exports = connectDB;