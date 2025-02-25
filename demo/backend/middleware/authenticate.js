const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key'; // Replace with your actual secret key

function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }

        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    });
}

module.exports = authenticate;