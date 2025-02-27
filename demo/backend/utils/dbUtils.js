const db = require('../db');

const executeQuery = (sql, params, res) => {
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

module.exports = { executeQuery };
