require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3306;

// Print environment variables to ensure they are correct
console.log('Environment Variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the Beaver Botanica database.');
    }
});

// Parse JSON bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Beaver Botanica API');
});

// Script to get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
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
app.get('/plants/:id', (req, res) => {
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

// Script to add a new plant
app.post('/plants', (req, res) => {
    const { species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate } = req.body;
    const sql = 'INSERT INTO Plants (species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body,
            id: result.insertId
        });
    });
});

// Script to update a plant
app.put('/plants/:id', (req, res) => {
    const { species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate } = req.body;
    const sql = 'UPDATE Plants SET species_id = ?, image_id = ?, description = ?, location = ?, season = ?, avg_rating = ?, date_added = ?, date_updated = ?, x_coordinate = ?, y_coordinate = ? WHERE plant_id = ?';
    const params = [species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
    });
});

// Script to delete a plant
app.delete('/plants/:id', (req, res) => {
    const sql = 'DELETE FROM Plants WHERE plant_id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'deleted',
            changes: result.affectedRows
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
