const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

function authenticate(req, res, next) {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) {
        console.error('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.error('Token expired:', err.message);
                return res.status(401).json({ error: 'Token expired' });
            }
            console.error('Failed to authenticate token:', err.message);
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        console.log('Decoded token:', decoded);
        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
        };
        next();
    });
}

module.exports = authenticate;