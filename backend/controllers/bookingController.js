

const Booking = require("../models/Booking");
const Room = require("../models/Room");

// =======================================
// Book Room
// =======================================

const bookRoom = async (req, res) => {

    try {

          console.log(req.body);   // 👈 yaha
        const {
           roomId,
           checkInDate,
            checkOutDate,
            guests,
            guestName
               } = req.body;


        // Room Find

        const room = await Room.findById(roomId)
            .populate("hotel");

        if (!room) {

            return res.status(404).json({

                success: false,
                message: "Room Not Found"

            });

        }

        // Calculate Total Price

        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);

        const totalDays = Math.ceil(

            (end - start) / (1000 * 60 * 60 * 24)

        );

        if (totalDays <= 0) {

            return res.status(400).json({

                success: false,
                message: "Invalid Check In / Check Out Date"

            });

        }

        const totalPrice = totalDays * room.price;

        // Create Booking

        const booking = await Booking.create({

    user: req.user.id,

    owner: room.owner,

    hotel: room.hotel._id,

    room: room._id,

    checkInDate,

    checkOutDate,

    guests,

    guestName,

    totalPrice

});

        res.status(201).json({

            success: true,

            message: "Room Booked Successfully",

            booking

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


// =======================================
// Get My Bookings
// =======================================

const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({

            user: req.user.id

        })

        .populate("hotel", "hotelName city state image")

        .populate("room", "roomName roomType price image")

        .sort({ createdAt: -1 });

        res.json({

            success: true,

            bookings

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
// Cancel Booking
// ======================================

const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking Not Found"

            });

        }

        // Sirf apni booking cancel kar sakta hai

        if (booking.user.toString() !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        // Already cancelled

        if (booking.status === "Cancelled") {

            return res.status(400).json({

                success: false,

                message: "Booking Already Cancelled"

            });

        }

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({

            success: true,

            message: "Booking Cancelled Successfully"

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
// Get Owner Bookings
// ======================================

const getOwnerBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({

            owner: req.user.id

        })

        .populate("hotel", "hotelName city state image")

        .populate("room", "roomName roomType price image")

        .populate("user", "fullName email phone")

        .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            bookings

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
// Accept Booking
// ======================================

const acceptBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking Not Found"

            });

        }

        if (booking.owner.toString() !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        booking.status = "Confirmed";

        await booking.save();

        res.status(200).json({

            success: true,

            message: "Booking Confirmed Successfully"

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
// Reject Booking
// ======================================

const rejectBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking Not Found"

            });

        }

        if (booking.owner.toString() !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        booking.status = "Rejected";

        await booking.save();

        res.status(200).json({

            success: true,

            message: "Booking Rejected Successfully"

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
    bookRoom,
    getMyBookings,
    cancelBooking,
    getOwnerBookings,
    acceptBooking,
    rejectBooking
};