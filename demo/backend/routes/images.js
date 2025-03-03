const express = require('express');
const router = express.Router();
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed
const { executeSelectQuery, executeInsertQuery, executeUpdateQuery, executeDeleteQuery } = require('../utils/dbUtils'); // Import the utility functions

// Script to get all images
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Images';
    executeSelectQuery(sql, [], res);
});

// Script to get a specific image by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM Images WHERE image_id = ?';
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to add a new image
router.post('/', (req, res) => {
    const { plant_id, image_url, date_uploaded } = req.body;
    const sql = `
        INSERT INTO Images (plant_id, image_url, date_uploaded)
        VALUES (?, ?, ?)
    `;
    const params = [plant_id, image_url, date_uploaded];
    executeInsertQuery(sql, params, res);
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
    executeUpdateQuery(sql, params, res);
});

// Script to delete an image
router.delete('/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Images
        WHERE image_id = ?
    `;
    const params = [req.params.id];
    executeDeleteQuery(sql, params, res);
});

module.exports = router;
