const express = require('express');
const router = express.Router();
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed
const { executeSelectQuery, executeInsertQuery, executeUpdateQuery, executeDeleteQuery } = require('../utils/dbUtils'); // Import the utility functions

// Script to get all plants
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Plants';
    executeSelectQuery(sql, [], res);
});

// Script to get a specific plant by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM Plants WHERE plant_id = ?';
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to add a new plant
router.post('/', (req, res) => {
    const { species_id, image_urls, description, location, season, date_added, x_coordinate, y_coordinate } = req.body;
    const sql = `
        INSERT INTO Plants (
            species_id,
            description,
            location,
            season,
            date_added,
            x_coordinate,
            y_coordinate
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [species_id, description, location, season, date_added, x_coordinate, y_coordinate];
    executeInsertQuery(sql, params, res, (result) => {
        const plant_id = result.insertId;
        const imageSql = `
            INSERT INTO Images (plant_id, image_url, date_uploaded)
            VALUES (?, ?, ?)
        `;
        const imageParams = image_urls.map(url => [plant_id, url, new Date().toISOString().split('T')[0]]);
        imageParams.forEach(params => executeInsertQuery(imageSql, params, res));
    });
});

// Script to update a plant
router.put('/:id', verifyUserOrAdmin, (req, res) => {
    const { species_id, image_urls, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate } = req.body;
    const sql = `
        UPDATE Plants
        SET
            species_id = ?,
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
    const params = [species_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate, req.params.id];
    executeUpdateQuery(sql, params, res, () => {
        const deleteImageSql = `
            DELETE FROM Images
            WHERE plant_id = ?
        `;
        executeDeleteQuery(deleteImageSql, [req.params.id], res, () => {
            const imageSql = `
                INSERT INTO Images (plant_id, image_url, date_uploaded)
                VALUES (?, ?, ?)
            `;
            const imageParams = image_urls.map(url => [req.params.id, url, new Date().toISOString().split('T')[0]]);
            imageParams.forEach(params => executeInsertQuery(imageSql, params, res));
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
    executeDeleteQuery(sql, params, res);
});

module.exports = router;
