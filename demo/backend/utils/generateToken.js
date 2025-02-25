const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

function generateToken(user) {
    const payload = {
        id: user.id,
        role: user.role
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

module.exports = generateToken;