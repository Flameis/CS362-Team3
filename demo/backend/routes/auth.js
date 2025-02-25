const express = require('express');
const db = require('../db');
const generateToken = require('../utils/generateToken');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = results[0];
        const token = generateToken(user);
        res.json({ token });
    });
});

module.exports = router;
