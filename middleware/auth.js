const jwt = require('jsonwebtoken')


module.exports.checkAuth= (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({
                message: 'Expired token',
                status: -1
            })
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).send({
                message: 'Invalid token',
                status: -1
            })
        } else {
            return res.status(401).send({
                message: 'Unauthorized access',
                status: -1
            })
        }

    }
}