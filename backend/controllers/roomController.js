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


// ======================================
// Get Single Room
// ======================================

const getSingleRoom = async (req, res) => {

    try {

        const room = await Room.findById(req.params.id)
            .populate("hotel", "hotelName");

        if (!room) {

            return res.status(404).json({

                success: false,
                message: "Room Not Found"

            });

        }

        // Owner Security Check

        if (room.owner.toString() !== req.user.id) {

            return res.status(403).json({

                success: false,
                message: "Unauthorized"

            });

        }

        res.status(200).json({

            success: true,
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
// Update Room
// ======================================

const updateRoom = async (req, res) => {

    try {

        const room = await Room.findById(req.params.id);

        if (!room) {

            return res.status(404).json({

                success: false,
                message: "Room Not Found"

            });

        }

        // Owner Security

        if (room.owner.toString() !== req.user.id) {

            return res.status(403).json({

                success: false,
                message: "Unauthorized"

            });

        }

        const {

            roomName,
            roomType,
            price,
            capacity,
            description,
            image,
            status

        } = req.body;

        room.roomName = roomName;
        room.roomType = roomType;
        room.price = price;
        room.capacity = capacity;
        room.description = description;
        room.image = image;
        room.status = status;

        await room.save();

        res.status(200).json({

            success: true,
            message: "Room Updated Successfully",
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
// Delete Room
// ======================================

const deleteRoom = async (req, res) => {

    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room Not Found"
            });
        }

        // Security Check

        if (room.owner.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await Room.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Room Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ======================================
// User - Get Rooms By Hotel
// ======================================



const getRoomsByHotel = async (req, res) => {

    try {

        const rooms = await Room.find({

            hotel: req.params.hotelId

        });

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

const getRoomDetails = async (req, res) => {

    try {

        const room = await Room.findById(req.params.id)
            .populate("hotel");

        if (!room) {

            return res.status(404).json({
                success: false,
                message: "Room Not Found"
            });

        }

        res.status(200).json({

            success: true,
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



module.exports = {

    addRoom,
    getMyRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom,
    getRoomsByHotel,
    getRoomDetails

};