const mongoose = require("mongoose");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Booking = require("../models/Booking");

const ownerDashboard = async (req, res) => {

    try {

        const ownerId = req.user.id;

        const totalHotels = await Hotel.countDocuments({
            owner: ownerId
        });

        const totalRooms = await Room.countDocuments({
            owner: ownerId
        });

        const pendingReservations = await Booking.countDocuments({
            owner: ownerId,
            status: "Pending"
        });

        const confirmedReservations = await Booking.countDocuments({
            owner: ownerId,
            status: "Confirmed"
        });
          
          const firstHotel = await Hotel.findOne({
    owner: ownerId
});

const hotelName = firstHotel
    ? firstHotel.hotelName
    : "No Hotel";


       

const revenue = await Booking.aggregate([

    {
        $match: {
            owner: new mongoose.Types.ObjectId(ownerId),
            status: "Confirmed"
        }
    },

    {
        $group: {
            _id: null,
            totalRevenue: {
                $sum: "$totalPrice"
            }
        }
    }

]);

        res.json({

            success: true,

           dashboard: {

    totalHotels,

    totalRooms,

    pendingReservations,

    confirmedReservations,

    totalRevenue:
        revenue.length > 0
            ? revenue[0].totalRevenue
            : 0,

    hotelName

}

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

    ownerDashboard

};