const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const generateToken = require('../utils/generateToken');
const authenticate = require('../middleware/authenticate'); // Import the authenticate middleware
const { executeQuery } = require('../utils/dbUtils'); // Import the utility function
const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true }); // Set the token as a cookie  //! dont do this as it cant be removed by the web server - We may need to find an alternative ~Luke
        res.json({ token });
    });
});

// Script to get a specific user by token by using authenticate middleware
router.get('/me', authenticate, (req, res) => {
    console.log('Authenticated user ID:', req.user.id); // Add this line for debugging
    const sql = 'SELECT user_id, username, email, date_joined, role FROM Users WHERE user_id = ?'; // Exclude password_hash
    const params = [req.user.id];
    executeQuery(sql, params, res);
});

module.exports = router;
