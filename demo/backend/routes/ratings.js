const express = require('express');
const router = express.Router();
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed
const authenticate = require('../middleware/authenticate'); // Adjust the path as needed
const { executeSelectQuery, executeInsertQuery, executeUpdateQuery, executeDeleteQuery } = require('../utils/dbUtils'); // Import the utility functions



const select_ratings_sql = `
SELECT
    *
FROM
    Ratings
`

// Script to get all ratings //? should it join with users?
router.get('/', (req, res) => {
    const sql = select_ratings_sql;
    executeSelectQuery(sql, [], res);
});

// Script to get a specific rating by ID
router.get('/:id', (req, res) => {
    const sql = `${select_ratings_sql} WHERE rating_id = ?`;
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to get all ratings for plant
router.get('/plant/:id', (req, res) => {
    const sql = `${select_ratings_sql} WHERE plant_id = ?`;
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to get current user's rating for plant
router.get('/plant/:id/user', authenticate, (req, res) => {
    const sql = `${select_ratings_sql} WHERE plant_id = ? AND user_id = ?`;
    const params = [req.params.id, req.user.id];
    executeSelectQuery(sql, params, res, result=>{
        result.data = result.data[0];
        res.json(result);
    });
});

// Script to add a new rating
router.post('/', authenticate, (req, res) => {
    const { plant_id, rating} = req.body;
    const sql = `
        INSERT INTO Ratings (plant_id, user_id, rating)
        VALUES (?, ?, ?)
    `;
    const params = [plant_id, req.user.id, rating];
    executeInsertQuery(sql, params, res, 
        result => executeSelectQuery('SELECT avg_rating from Plants where plant_id = ?', [plant_id], res, // get new avg
        result2=> {
            result.new_avg = result2.data[0].avg_rating;
            res.json(result);
        }
    ));
});

// Script to update a rating by plant id for current user
router.put('/plant/:id/user', authenticate, (req, res) => {
    const { rating } = req.body;
    const sql = `
        UPDATE Ratings
            SET rating = ?
        WHERE plant_id = ?
        AND user_id = ?
    `;
    const params = [rating, req.params.id, req.user.id];
    executeUpdateQuery(sql, params, res,
        result => executeSelectQuery('SELECT avg_rating from Plants where plant_id = ?', [req.params.id], res, // get new avg
        result2=> {
            result.new_avg = result2.data[0].avg_rating;
            res.json(result);
        } 
    ));
    
});

// Script to update a rating
// warn: not very useful as when seting rating your more likely to know user_id and plant_id. use the above one instead
router.put('/:id', authenticate, (req, res) => { // warn: should have verifyUserOrAdmin but that does not work yet
    //todo: could do a quick check here if user_id == req.user.id, but that would mess with admin
    const { plant_id, user_id, rating } = req.body;
    const sql = `
        UPDATE Ratings
        SET rating = ?
        WHERE rating_id = ?
    `;
    const params = [plant_id, user_id, rating, req.params.id];
    executeUpdateQuery(sql, params, res);
});

// Script to delete a rating
router.delete('/:id', authenticate, verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Plants
        WHERE rating_id = ?
    `;
    const params = [req.params.id];
    executeDeleteQuery(sql, params, res);
});

module.exports = router;
