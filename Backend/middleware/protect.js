const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function protect(req, res, next) {

    try {
        let headers = req.headers.authorization
        if (headers && headers.startsWith("Bearer")) {
            const token = headers.split(" ")[1];

            if (!token) {
                return res.status(404).json({
                    error: true,
                    message: "Token not found"
                })
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(404).json({
                    error: false,
                    message: "User does not found",
                })
            }

            next();

        } else {
            res.status(400).json({
                error: true,
                message: "User not authorized"
            })
        }
    } catch (error) {
        res.status(401).json({
            error: true,
            message: `Verfication is failed : ${error.message}`

        })
    }
}

module.exports = { protect };