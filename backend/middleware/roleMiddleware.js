const isUser = (req, res, next) => {

    if (req.user.role !== "user") {
        return res.status(403).json({
            success: false,
            message: "Access Denied. User Only."
        });
    }

    next();
};

const isOwner = (req, res, next) => {

    if (req.user.role !== "owner") {
        return res.status(403).json({
            success: false,
            message: "Access Denied. Owner Only."
        });
    }

    next();
};

const isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access Denied. Admin Only."
        });
    }

    next();
};

module.exports = {
    isUser,
    isOwner,
    isAdmin
};