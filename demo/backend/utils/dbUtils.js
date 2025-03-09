const db = require('../db');

const executeSelectQuery = (sql, params, res, next=null) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        let result = {
            message: 'success',
            data: results
        };
        if (next === null) {
            res.json(result);
            return;
        }
        next(result);
    });
};

const executeInsertQuery = (sql, params, res, next=null) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        let result = {
            message: 'success',
            data: results,
            insertedId: results.insertId
        };
        if (next === null) {
            res.json(result);
            return;
        }
        next(result);
    });
};

const executeUpdateQuery = (sql, params, res, next=null) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        let result = {
            message: 'success',
            data: results,
            affectedRows: results.affectedRows
        };
        if (next === null) {
            res.json(result);
            return;
        }
        next(result);
    });
};

const executeDeleteQuery = (sql, params, res, next=null) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        let result = {
            message: 'success',
            data: results,
            // deletedId: params[0] // this is not accurate (if i delete all images based on plant_id this returns plant_id); use affectedRows instead
            affectedRows: results.affectedRows
        };
        if (next === null) {
            res.json(result);
            return;
        }
        next(result);
    });
};

module.exports = {
    executeSelectQuery,
    executeInsertQuery,
    executeUpdateQuery,
    executeDeleteQuery
};
