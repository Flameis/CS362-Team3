const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path as needed
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed

// Script to get all plants
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Plants';
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

// Script to get a specific plant by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM Plants WHERE plant_id = ?';
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

// Script to add a new plant
router.post('/', (req, res) => {
    const { species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate } = req.body;
    const sql = `
        INSERT INTO Plants (
            species_id,
            image_id,
            description,
            location,
            season,
            avg_rating,
            date_added,
            date_updated,
            x_coordinate,
            y_coordinate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate];
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

// Script to update a plant
router.put('/:id', verifyUserOrAdmin, (req, res) => {
    const { species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate } = req.body;
    const sql = `
        UPDATE Plants
        SET
            species_id = ?,
            image_id = ?,
            description = ?,
            location = ?,
            season = ?,
            avg_rating = ?,
            date_added = ?,
            date_updated = ?,
            x_coordinate = ?,
            y_coordinate = ?
        WHERE
            plant_id = ?
    `;
    const params = [species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate, req.params.id];
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

// Script to delete a plant
router.delete('/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Plants
        WHERE plant_id = ?
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
