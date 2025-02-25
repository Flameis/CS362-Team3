const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path as needed
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed

// Script to get all comments
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Comments';
    const params = [];
    db.query(sql, params, (err, results) => {
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

// Script to get a user's comments
router.get('/user/:id', (req, res) => {
    const sql = 'SELECT * FROM Comments WHERE user_id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, results) => {
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

// Script to get a plant's comments
router.get('/plant/:id', (req, res) => {
    const sql = 'SELECT * FROM Comments WHERE plant_id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, results) => {
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

// Script to add a new comment
router.post('/', (req, res) => {
    const { plant_id, user_id, comment, date_posted } = req.body;
    const sql = `
        INSERT INTO Comments (plant_id, user_id, comment, date_posted)
        VALUES (?, ?, ?, ?)
    `;
    const params = [plant_id, user_id, comment, date_posted];
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
});

// Script to update a comment
router.put('/:id', verifyUserOrAdmin, (req, res) => {
    const { plant_id, user_id, comment, date_posted } = req.body;
    const sql = `
        UPDATE Comments
        SET plant_id = ?, user_id = ?, comment = ?, date_posted = ?
        WHERE comment_id = ?
    `;
    const params = [plant_id, user_id, comment, date_posted, req.params.id];
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

// Script to delete a comment
router.delete('/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Comments
        WHERE comment_id = ?
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
