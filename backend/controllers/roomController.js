const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

// ======================================
// Add Room
// ======================================

const addRoom = async (req, res) => {

    try {

        const {
            hotelId,
            roomName,
            roomType,
            price,
            capacity,
            description,
            image
        } = req.body;

        // Validation

        if (
            !hotelId ||
            !roomName ||
            !roomType ||
            !price ||
            !capacity ||
            !description ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        // Check Hotel Exists

        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel Not Found"
            });
        }

        // Security Check
        // Owner can add room only in own hotel

        if (hotel.owner.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const room = await Room.create({

            hotel: hotelId,

            owner: req.user.id,

            roomName,

            roomType,

            price,

            capacity,

            description,

            image

        });

        res.status(201).json({

            success: true,

            message: "Room Added Successfully",

            room

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
// Get All Rooms of Owner
// ======================================

const getMyRooms = async (req, res) => {

    try {

        const rooms = await Room.find({

            owner: req.user.id

        }).populate(

            "hotel",
            "hotelName city state"
        );

        res.status(200).json({

            success: true,

            totalRooms: rooms.length,

            rooms

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

    addRoom,
    getMyRooms

};