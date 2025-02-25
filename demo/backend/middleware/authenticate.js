const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key'; // Replace with your actual secret key

function authenticate(req, res, next) {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        console.log('Decoded token:', decoded); // Add this line for debugging
        req.user = {
            id: decoded.id,
            username: decoded.username, // Attach username to the request object
            role: decoded.role
        };
        next(); // Pass control to the next middleware or route handler
    });
}

module.exports = authenticate;