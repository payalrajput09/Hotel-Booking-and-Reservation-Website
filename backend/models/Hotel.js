const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },

    hotelName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    propertyType: {
        type: String,
        required: true
    },

    starRating: {
        type: Number,
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

    address: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Hotel", hotelSchema);