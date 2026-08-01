const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "owner"
    },

    isVerified: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Owner", ownerSchema);