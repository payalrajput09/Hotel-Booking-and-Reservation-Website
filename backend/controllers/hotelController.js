const Hotel = require("../models/Hotel");

// ===============================
// Add Hotel
// ===============================

const addHotel = async (req, res) => {

    try {

        const {
            hotelName,
            description,
            propertyType,
            starRating,
            country,
            state,
            city,
            address,
            price,
            image
        } = req.body;

        if (
            !hotelName ||
            !description ||
            !propertyType ||
            !starRating ||
            !country ||
            !state ||
            !city ||
            !address ||
            !price ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const hotel = await Hotel.create({
            owner: req.user.id,
            hotelName,
            description,
            propertyType,
            starRating,
            country,
            state,
            city,
            address,
            price,
            image
        });

        res.status(201).json({
            success: true,
            message: "Hotel Added Successfully",
            hotel
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Get My Hotels
// ===============================

const getMyHotels = async (req, res) => {

    try {

        const hotels = await Hotel.find({
            owner: req.user.id
        });

        res.status(200).json({
            success: true,
            totalHotels: hotels.length,
            hotels
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addHotel,
    getMyHotels
};