const db = require('../db');

const executeSelectQuery = (sql, params, res) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results
        });
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
        }
        if (next === null) {
            res.json(result);
            return;
        }
        next(result);
    });
};

const executeUpdateQuery = (sql, params, res) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results,
            affectedRows: results.affectedRows
        });
    });
};

const executeDeleteQuery = (sql, params, res) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results,
            deletedId: params[0]
        });
    });
};

module.exports = {
    executeSelectQuery,
    executeInsertQuery,
    executeUpdateQuery,
    executeDeleteQuery
};
