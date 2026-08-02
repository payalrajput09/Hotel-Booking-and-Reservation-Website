const allowBooking = (req, res, next) => {

    if (
        req.user.role === "user" ||
        req.user.role === "owner"
    ) {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Access Denied"
    });

};

module.exports = allowBooking;