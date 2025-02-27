const db = require('../db'); // Adjust the path as needed

 //! Should be changed
function verifyUserOrAdmin(req, res, next) {
    const userId = req.user.id; // Access the authenticated user's ID
    const userRole = req.user.role; // Access the authenticated user's role
    const resourceId = req.params.id; // Access the resource ID from the request parameters

    if (userRole === 'admin') {
        return next(); // Allow access if the user is an admin
    }

    const sql = 'SELECT user_id FROM Users WHERE user_id = ?';
    db.query(sql, [resourceId], (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (results.length === 0 || results[0].user_id !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next(); // Allow access if the user owns the resource
    });
}

module.exports = verifyUserOrAdmin;
