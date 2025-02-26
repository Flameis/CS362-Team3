const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // Adjust the path as needed
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed

// Script to get all users
router.get('/', (req, res) => {
    const sql = 'SELECT user_id, username, date_joined, role FROM Users'; // Exclude password_hash
    db.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results
        });
    });
});

// Script to get a specific user by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT user_id, username, email, date_joined, role FROM Users WHERE user_id = ?'; // Exclude password_hash
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (result.length > 0) {
            res.json({
                message: 'success',
                data: result[0]
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    });
});

// Script to add a new user with hashed password
router.post('/', async (req, res) => {
    const { username, email, password, date_joined, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `
            INSERT INTO Users (username,email, password_hash, date_joined, role)
            VALUES (?, ?, ?, ?, ?)
        `;
        const params = [username, email, hashedPassword, date_joined, role];
        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: req.body,
                id: result.insertId
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
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
