function roleAuthentication(roles) {
    return (req,res,next) => {
        try {
            if (!roles.includes(req.user.role)) {
                res.status(403).json({
                    error: true,
                    message: "Access denied"
                })
            }
            next();
        }catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
    }


}

module.exports = {
    roleAuthentication
}