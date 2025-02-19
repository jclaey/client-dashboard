import jwt from 'jsonwebtoken'

export const authAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            res.status(401)
            throw new Error('Access denied. No token provided.')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.adminId = decoded.adminId
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' })
    }
}