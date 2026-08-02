const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(

    {

        // User

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        // Owner

        owner: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Owner",

            required: true

        },

        // Hotel

        hotel: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Hotel",

            required: true

        },

        // Room

        room: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Room",

            required: true

        },

        // Check In

        checkInDate: {

            type: Date,

            required: true

        },

        // Check Out

        checkOutDate: {

            type: Date,

            required: true

        },

        // Guests

        guests: {

            type: Number,

            required: true

        },

        guestName: {
             type: String,
             required: true
          },

        // Total Price

        totalPrice: {

            type: Number,

            required: true

        },

        // Booking Status

        status: {

            type: String,

            enum: [

                "Pending",

                "Confirmed",

                "Checked In",

                "Checked Out",

                "Cancelled",

                "Rejected",

            ],

            default: "Pending"

        },

        // Payment Status

        paymentStatus: {

            type: String,

            enum: [

                "Pending",

                "Paid"

            ],

            default: "Pending"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(
    "Booking",
    bookingSchema
);