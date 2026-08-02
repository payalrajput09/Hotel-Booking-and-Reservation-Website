const Booking = require("../models/Booking");

const userDashboard = async (req, res) => {

    try {

        const userId = req.user.id;

        // Total Bookings
        const totalBookings = await Booking.countDocuments({
            user: userId
        });

        // Pending Bookings
        const pendingBookings = await Booking.countDocuments({
            user: userId,
            status: "Pending"
        });

        // Upcoming Booking
        const upcomingBooking = await Booking.findOne({

            user: userId,

            checkInDate: {
                $gte: new Date()
            }

        })

        .populate("hotel", "hotelName city")

        .sort({
            checkInDate: 1
        });

        // Recent Bookings
        const recentBookings = await Booking.find({

            user: userId

        })

        .populate("hotel", "hotelName")

        .sort({
            createdAt: -1
        })

        .limit(5);

        res.status(200).json({

            success: true,

            dashboard: {

                totalBookings,

                pendingBookings,

                upcomingBooking,

                recentBookings

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
    userDashboard
};