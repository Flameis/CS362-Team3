const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

function generateToken(user) {
    const payload = {
        id: user.user_id,
        username: user.username, // Include username in the payload
        role: user.role
    };
    return jwt.sign(payload, secretKey, { expiresIn: '5h' });
}

module.exports = generateToken;