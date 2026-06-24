const jwt = require('jsonwebtoken');
const User = require('../models/user.js')

const protect = async (req, res, next) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "invalid token"
            })

        }

        const decode = jwt.verify(
            token,
            process.env.SECRET
        )

        req.user = await User.findById(decode.userId);

        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "invalid token"
        })
    }

}

const isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin Access Only"
        })
    }

    next();

}

module.exports = {protect, isAdmin};