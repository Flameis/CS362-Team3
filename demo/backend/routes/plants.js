const express = require('express');
const router = express.Router();
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed
const authenticate = require('../middleware/authenticate'); // Adjust the path as needed
const { executeSelectQuery, executeInsertQuery, executeUpdateQuery, executeDeleteQuery } = require('../utils/dbUtils'); // Import the utility functions



// Script to get all plants
router.get('/raw', (req, res) => {
    const sql = 'SELECT * FROM Plants';
    executeSelectQuery(sql, [], res);
});

// Script to get a specific plant by ID
router.get('/raw/:id', (req, res) => {
    const sql = 'SELECT * FROM Plants WHERE plant_id = ?';
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});


const select_plants_sql = `
SELECT 
    Plants.*, 
    Users.username AS user, 
    Users.role AS user_role, 
    Species.*, 
    -- (SELECT JSON_ARRAYAGG(JSON_OBJECT('image_id', Images.image_id, 'image_url', Images.image_url))
    --  FROM 
    --     Images 
    --  WHERE 
    --     Images.plant_id = Plants.plant_id
    --  ORDER BY 
    --     Images.image_id) AS images 
    (SELECT JSON_OBJECTAGG(Images.image_id, Images.image_url)
    FROM 
        Images 
    WHERE 
        Images.plant_id = Plants.plant_id) AS images
FROM 
    Plants 
JOIN 
    Species 
ON 
    Plants.species_id = Species.species_id 
LEFT JOIN 
    Users 
ON 
    Plants.created_by = Users.user_id
`

router.get('/', (req, res) => {
    // const sql = 'SELECT * FROM Plants JOIN Species ON Plants.species_id = Species.species_id ';
    const sql = select_plants_sql;
    executeSelectQuery(sql, [], res);
});

// Script to get a specific plant by ID
router.get('/:id', (req, res) => {
    // const sql = 'SELECT * FROM Plants JOIN Species ON Plants.species_id = Species.species_id WHERE plant_id = ?';
    const sql = `${select_plants_sql} WHERE Plants.plant_id = ?`;
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});


// Script to add a new plant
router.post('/', authenticate, (req, res) => {
    const { species_id, image_urls, description, location, season, date_added, x_coordinate, y_coordinate } = req.body;
    const sql = `
        INSERT INTO Plants (
            species_id,
            description,
            location,
            season,
            date_added,
            x_coordinate,
            y_coordinate,
            created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [species_id, description, location, season, date_added, x_coordinate, y_coordinate,req.user?.id];
    executeInsertQuery(sql, params, res, (result) => {
        const plant_id = result.insertedId;
        const imageSql = `
            INSERT INTO Images (plant_id, image_url, date_uploaded)
            VALUES (?, ?, ?)
        `;
        const imageParams = image_urls.map(url => [plant_id, url, new Date().toISOString().split('T')[0]]);
        // imageParams.forEach(params => executeInsertQuery(imageSql, params, res, (result2) => {result.result2=result2;res.json(result)}));
        let image_results = []
        imageParams.forEach(params => executeInsertQuery(imageSql, params, res, (result2) => {image_results.push(result2)}));
        result.image_inserts=image_results; // warn: ugggh to acually make this work i would need promises. will probably be blank every time.
        res.json(result);
    });
});

// Script to update a plant
router.put('/:id', authenticate, (req, res) => { // warn: ignore privlages for now
// router.put('/:id', authenticate, verifyUserOrAdmin, (req, res) => {
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
    executeUpdateQuery(sql, params, res, (result) => {
        // warn: this is a hack to prevent doubble img adds (might be vonerable to race conditions)
        const deleteImageSql = `
            DELETE FROM Images
            WHERE plant_id = ?
        `;
        executeDeleteQuery(deleteImageSql, [req.params.id], res, (result2) => {
            const imageSql = `
                INSERT INTO Images (plant_id, image_url, date_uploaded)
                VALUES (?, ?, ?)
            `;
            const imageParams = image_urls.map(url => [req.params.id, url, new Date().toISOString().split('T')[0]]);
            let image_results = []
            imageParams.forEach(params => executeInsertQuery(imageSql, params, res, (result3) => {image_results.push(result3)}));
            result.image_deletes=result2;
            result.image_inserts=image_results; // warn: ugggh to acually make this work i would need promises. will probably be blank every time.
            res.json(result);
        });
    });
});

// Script to verify a plant
router.post('/:id/verify', authenticate, verifyUserOrAdmin, (req, res) => {
    const sql = `
        UPDATE Plants
        SET verified = 1
        WHERE plant_id = ?
    `;
    const params = [req.params.id];
    executeUpdateQuery(sql, params, res, (result) => {
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Plant not found' });
        } else {
            res.json({ message: 'Plant verified successfully' });
        }
    });
});

// Script to delete a plant
router.delete('/:id', authenticate, verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Plants
        WHERE plant_id = ?
    `;
    const params = [req.params.id];
    executeDeleteQuery(sql, params, res);
});

module.exports = router;
