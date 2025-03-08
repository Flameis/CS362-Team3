const db = require('../db'); // Adjust the path as needed

const verifyUserOrAdmin = (req, res, next) => {
  console.log(req.user);
  try {
    const userId = req.user?.id; // Ensure req.user is not null
    if (userId === null) {
      return res.status(401).json({ error: "Unauthorized: User ID is missing" });
    }
    const userRole = req.user.role; // Access the authenticated user's role
    const resourceId = req.params.id; // Access the resource ID from the request parameters

    if (userRole === 'admin') {
        return next(); // Allow access if the user is an admin
    }

    const sql = 'SELECT user_id FROM Users WHERE user_id = ?';
    executeQuery(sql, [resourceId], (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (results.length === 0 || results[0].user_id !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next(); // Allow access if the user owns the resource
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = verifyUserOrAdmin;
