const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path as needed
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed

// Script to get all images
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Images';
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

// Script to get a specific image by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM Images WHERE image_id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result
        });
    });
});

// Script to add a new image
router.post('/', (req, res) => {
    const { plant_id, image_url, date_uploaded } = req.body;
    const sql = `
        INSERT INTO Images (plant_id, image_url, date_uploaded)
        VALUES (?, ?, ?)
    `;
    const params = [plant_id, image_url, date_uploaded];
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

// Script to update an image
router.put('/:id', verifyUserOrAdmin, (req, res) => {
    const { plant_id, image_url, date_uploaded } = req.body;
    const sql = `
        UPDATE Images
        SET plant_id = ?, image_url = ?, date_uploaded = ?
        WHERE image_id = ?
    `;
    const params = [plant_id, image_url, date_uploaded, req.params.id];
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

// Script to delete an image
router.delete('/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Images
        WHERE image_id = ?
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
