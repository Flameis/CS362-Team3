const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const verifyUserOrAdmin = require('../middleware/verifyUserOrAdmin');
const { executeSelectQuery, executeInsertQuery, executeUpdateQuery, executeDeleteQuery } = require('../utils/dbUtils');

const select_report_sql = 'SELECT Reports.*, Users.username, Users.role FROM Reports JOIN Users ON Reports.user_id=Users.user_id';

// Script to get all reports
router.get('/', (req, res) => {
    const sql = select_report_sql;
    executeSelectQuery(sql, [], res);
});

// Script to get a user's reports
router.get('/user/:id', (req, res) => {
    const sql = `${select_report_sql} WHERE user_id = ?`;
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to get a plant's reports
router.get('/plant/:id', (req, res) => {
    const sql = `${select_report_sql} WHERE plant_id = ?`;
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to get a report by id
router.get('/:id', (req, res) => {
    const sql = `${select_report_sql} WHERE report_id = ?`;
    const params = [req.params.id];
    executeSelectQuery(sql, params, res);
});

// Script to add a new report
router.post('/', authenticate, (req, res) => {
    const { plant_id, description } = req.body;
    const sql = `
        INSERT INTO Reports (plant_id, user_id, description, date_reported)
        VALUES (?, ?, ?, ?)
    `;
    const params = [plant_id, req.user.id, description, new Date().toISOString().split('T')[0]];
    executeInsertQuery(sql, params, res, 
        result => executeSelectQuery(`${select_report_sql} WHERE report_id = ?`, [result.insertedId], res, 
        result2 => { res.json({
            message: result2.message,
            data: result2.data[0],
            insertedId: result.insertedId,
            insert_result: result
        }) }
    ));
});

// Script to update a report
router.put('/:id', authenticate, verifyUserOrAdmin, (req, res) => {
    const { plant_id, user_id, description, date_reported } = req.body;
    const sql = `
        UPDATE Reports
        SET plant_id = ?, user_id = ?, description = ?, date_reported = ?
        WHERE report_id = ?
    `;
    const params = [plant_id, user_id, description, date_reported, req.params.id];
    executeUpdateQuery(sql, params, res);
});

// Script to delete a report
router.delete('/:id', authenticate, verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Reports
        WHERE report_id = ?
    `;
    const params = [req.params.id];
    executeDeleteQuery(sql, params, res);
});

module.exports = router;
