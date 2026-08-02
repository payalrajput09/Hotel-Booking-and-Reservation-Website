

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
            guests

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

        .populate("hotel", "hotelName city state")

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


module.exports = {

    bookRoom,

    getMyBookings

};