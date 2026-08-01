const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },

    roomName: {
        type: String,
        required: true
    },

    roomType: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    capacity: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Available","Booked","Maintenance"],
        default: "Available"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Room", roomSchema);