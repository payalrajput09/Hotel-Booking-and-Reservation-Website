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



// ===============================
// Get Single Hotel
// ===============================

const getSingleHotel = async (req, res) => {

    try {

        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {

            return res.status(404).json({
                success: false,
                message: "Hotel Not Found"
            });

        }

        if (hotel.owner.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });

        }

        res.status(200).json({

            success: true,
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
// Update Hotel
// ===============================

const updateHotel = async (req, res) => {

    try {

        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel Not Found"
            });
        }

        // Owner check
        if (hotel.owner.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized Access"
            });
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Hotel Updated Successfully",
            hotel: updatedHotel
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Delete Hotel
// ===============================

const deleteHotel = async (req, res) => {

    try {

        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {

            return res.status(404).json({
                success: false,
                message: "Hotel Not Found"
            });

        }

        // Check Owner
        if (hotel.owner.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this hotel"
            });

        }

        await Hotel.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,
            message: "Hotel Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ===============================
// Get All Hotels (User)
// ===============================

const getAllHotels = async (req, res) => {

    try {

        const hotels = await Hotel.find();

        res.status(200).json({

            success: true,

            totalHotels: hotels.length,

            hotels

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Get Hotel Details (User)
// ===============================

const getHotelDetails = async (req, res) => {

    try {

        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {

            return res.status(404).json({

                success: false,

                message: "Hotel Not Found"

            });

        }

        res.status(200).json({

            success: true,

            hotel

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

    addHotel,

    getMyHotels,

    getSingleHotel,

    updateHotel,

    deleteHotel,

    getAllHotels,

    getHotelDetails

};