const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // Adjust the path as needed
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed
const { executeQuery } = require('../utils/dbUtils'); // Import the utility function

// Script to get all users
router.get('/', (req, res) => {
    const sql = 'SELECT user_id, username, date_joined, role FROM Users'; // Exclude password_hash
    executeQuery(sql, [], res);
});

// Script to get a specific user by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT user_id, username, email, date_joined, role FROM Users WHERE user_id = ?'; // Exclude password_hash
    const params = [req.params.id];
    executeQuery(sql, params, res);
});

// Script to add a new user with hashed password
router.post('/', async (req, res) => {
    const { username, email, password, date_joined, role } = req.body;

    // Check if the username or email already exists
    const checkUserSql = 'SELECT * FROM Users WHERE username = ? OR email = ?';
    db.query(checkUserSql, [username, email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            const existingUser = results[0];
            if (existingUser.username.toUpperCase() === username.toUpperCase()) {
                return res.status(400).json({ error: 'Username is already in use' });
            }
            if (existingUser.email.toUpperCase() === email.toUpperCase()) {
                return res.status(400).json({ error: 'Email is already in use' });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertUserSql = 'INSERT INTO Users (username, email, password_hash, date_joined, role) VALUES (?, ?, ?, ?, ?)';
        db.query(insertUserSql, [username, email, hashedPassword, date_joined, role], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Script to update a user
router.put('/:id', verifyUserOrAdmin, (req, res) => {
    const { username, date_joined, role } = req.body;
    const sql = `
        UPDATE Users
        SET username = ?, date_joined = ?, role = ?
        WHERE user_id = ?
    `;
    const params = [username, date_joined, role, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
    });
});

// Script to delete a user
router.delete('/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Users
        WHERE user_id = ?
    `;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'deleted',
            changes: result.affectedRows
        });
    });
});

module.exports = router;
