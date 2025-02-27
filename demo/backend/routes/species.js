const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path as needed
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed
const { executeQuery } = require('../utils/dbUtils'); // Import the utility function

// Script to get all species
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Species';
    executeQuery(sql, [], res);
});

// Script to get a specific species by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM Species WHERE species_id = ?';
    const params = [req.params.id];
    executeQuery(sql, params, res);
});

// Script to add a new species
router.post('/', (req, res) => {
    const { scientific_name, division, class: className, order, family, genus, species, common_name, season } = req.body;
    const sql = `
        INSERT INTO Species (scientific_name, division, class, order, family, genus, species, common_name, season)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [scientific_name, division, className, order, family, genus, species, common_name, season];
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

// Script to update a species
router.put('/:id', verifyUserOrAdmin, (req, res) => {
    const { scientific_name, division, class: className, order, family, genus, species, common_name, season } = req.body;
    const sql = `
        UPDATE Species
        SET scientific_name = ?, division = ?, class = ?, order = ?, family = ?, genus = ?, species = ?, common_name = ?, season = ?
        WHERE species_id = ?
    `;
    const params = [scientific_name, division, className, order, family, genus, species, common_name, season, req.params.id];
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

// Script to delete a species
router.delete('/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Species
        WHERE species_id = ?
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