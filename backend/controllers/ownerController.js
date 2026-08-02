const Owner = require("../models/Owner");

// ================================
// Get Owner Profile
// ================================

const getOwnerProfile = async (req, res) => {

    try {

        const owner = await Owner.findById(req.user.id)
        .select("-password");

        if (!owner) {

            return res.status(404).json({

                success: false,

                message: "Owner Not Found"

            });

        }

        res.status(200).json({

            success: true,

            owner

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

    getOwnerProfile

};