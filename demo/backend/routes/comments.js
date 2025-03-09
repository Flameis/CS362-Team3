const express = require('express');
const router = express.Router();
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin'); // Adjust the path as needed
const { executeSelectQuery, executeInsertQuery, executeUpdateQuery, executeDeleteQuery } = require('../utils/dbUtils'); // Import the utility functions
const authenticate = require('../middleware/authenticate');

// Script to get all comments
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Comments';
    executeSelectQuery(sql, [], res);
});

// Script to get a user's comments
router.get('/user/:id', (req, res) => {
    const sql = 'SELECT * FROM Comments WHERE user_id = ?';
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to get a plant's comments
router.get('/plant/:id', (req, res) => {
    const sql = 'SELECT Comments.*, Users.username, Users.role FROM Comments JOIN Users ON Comments.user_id=Users.user_id WHERE plant_id = ?';
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to add a new comment
router.post('/', authenticate, (req, res) => {
    const { plant_id, comment} = req.body;
    const sql = `
        INSERT INTO Comments (plant_id, user_id, comment, date_posted)
        VALUES (?, ?, ?, ?)
    `;
    const params = [plant_id, req.user.id, comment, new Date().toISOString().split('T')[0]];
    executeInsertQuery(sql, params, res);
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
    executeUpdateQuery(sql, params, res);
});

// Script to delete a comment
router.delete('/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Comments
        WHERE comment_id = ?
    `;
    const params = [req.params.id];
    executeDeleteQuery(sql, params, res);
});

module.exports = router;
