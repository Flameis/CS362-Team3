const express = require('express');
const router = express.Router();
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed
const { executeSelectQuery, executeInsertQuery, executeUpdateQuery, executeDeleteQuery } = require('../utils/dbUtils'); // Import the utility functions

// Script to get all species
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Species';
    executeSelectQuery(sql, [], res);
});

// Script to get a specific species by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM Species WHERE species_id = ?';
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to add a new species
router.post('/', (req, res) => {
    const { scientific_name, division, class: className, order, family, genus, species, common_name, season } = req.body;
    const sql = `
        INSERT INTO Species (scientific_name, division, class, order, family, genus, species, common_name, season)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [scientific_name, division, className, order, family, genus, species, common_name, season];
    executeInsertQuery(sql, params, res);
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
    executeUpdateQuery(sql, params, res);
});

// Script to delete a species
router.delete('/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Species
        WHERE species_id = ?
    `;
    const params = [req.params.id];
    executeDeleteQuery(sql, params, res);
});

module.exports = router;