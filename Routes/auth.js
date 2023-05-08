const { verify } = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ message: 'Please provide a token' })
    }
    verify(authorization, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Please provide a valid token' })
        }
        next()
    })
}