require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = process.env.PORT || 3306;

// Print environment variables to ensure they are correct
console.log('Environment Variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Function to handle database connection
function handleConnection() {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            setTimeout(handleConnection, 2000); // Reconnect after 2 seconds
        } else {
            console.log('Connected to the Beaver Botanica database.');
        }
    });

    db.on('error', (err) => {
        console.error('Database error:', err.message);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection(); // Reconnect on connection loss
        } else {
            throw err;
        }
    });

    return db;
}

// Connect to the database
const db = handleConnection();

// Parse JSON
app.use(express.json());

// Serve the static files from the frontend directory
app.use(express.static(path.join(__dirname, '../../frontend')));

// Root route
app.get('/api', (req, res) => {
    res.send('Welcome to the Beaver Botanica API');
});

// Script to get all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT user_id, username, date_joined, role FROM Users'; // Exclude password_hash
    db.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results
        });
    });
});

// Script to get a specific user by ID
app.get('/api/users/:id', (req, res) => {
    const sql = 'SELECT user_id, username, date_joined, role FROM Users WHERE user_id = ?'; // Exclude password_hash
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result
        });
    });
});

// Script to get a users comments
app.get('/api/users/:id/comments', (req, res) => {
    const sql = 'SELECT * FROM Comments WHERE user_id = ?';
    const params = [req.params.id];
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
});

// Script to get all plants
app.get('/api/plants', (req, res) => {
    const sql = 'SELECT * FROM Plants';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results
        });
    });
});

// Script to get a specific plant by ID
app.get('/api/plants/:id', (req, res) => {
    const sql = 'SELECT * FROM Plants WHERE plant_id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result
        });
    });
});

// Script to get a plants comments
app.get('/api/plants/:id/comments', (req, res) => {
    const sql = 'SELECT * FROM Comments WHERE plant_id = ?';
    const params = [req.params.id];
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
});

// Script to get all images
app.get('/api/images', (req, res) => {
    const sql = 'SELECT * FROM Images';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results
        });
    });
});

// Script to get a specific image by ID
app.get('/api/images/:id', (req, res) => {
    const sql = 'SELECT * FROM Images WHERE image_id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result
        });
    });
});

// Script to get all species
app.get('/api/species', (req, res) => {
    const sql = 'SELECT * FROM Species';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results
        });
    });
});

// Script to get a specific species by ID
app.get('/api/species/:id', (req, res) => {
    const sql = 'SELECT * FROM Species WHERE species_id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result
        });
    });
});

// Serve the display-plants.html file
app.get('/plants', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/display-plants.html'));
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../frontend/react-app/build')));

// Serve the React app for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/react-app/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
