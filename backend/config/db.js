const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected Successfully");

    } catch (error) {

        console.error("❌ MongoDB Connection Error:", error.message);

        process.exit(1);   // Server stop kar de agar DB connect na ho

    }
};

module.exports = connectDB;