const path = require('path');
const express = require("express");
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const port = process.env.PORT || 8080;

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

// Middleware to verify user or admin
function verifyUserOrAdmin(req, res, next) {
    const userId = req.user.id;
    const userRole = req.user.role;
    const resourceId = req.params.id;
    if (userRole === 'admin') {
        return next();
    }
    const sql = 'SELECT user_id FROM Users WHERE user_id = ?';
    db.query(sql, [resourceId], (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (results.length === 0 || results[0].user_id !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    });
}

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

// Script to add a new plant
app.post('/plants', (req, res) => {
    const { species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate } = req.body;
    const sql = `
        INSERT INTO Plants (
            species_id,
            image_id,
            description,
            location,
            season,
            avg_rating,
            date_added,
            date_updated,
            x_coordinate,
            y_coordinate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
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
app.put('/plants/:id', verifyUserOrAdmin, (req, res) => {
    const { species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate } = req.body;
    const sql = `
        UPDATE Plants
        SET
            species_id = ?,
            image_id = ?,
            description = ?,
            location = ?,
            season = ?,
            avg_rating = ?,
            date_added = ?,
            date_updated = ?,
            x_coordinate = ?,
            y_coordinate = ?
        WHERE
            plant_id = ?
    `;
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
app.delete('/plants/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Plants
        WHERE plant_id = ?
    `;
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

// Script to add a new user
app.post('/users', (req, res) => {
    const { username, date_joined, role } = req.body;
    const sql = `
        INSERT INTO Users (username, date_joined, role)
        VALUES (?, ?, ?)
    `;
    const params = [username, date_joined, role];
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

// Script to update a user
app.put('/users/:id', verifyUserOrAdmin, (req, res) => {
    const { username, date_joined, role } = req.body;
    const sql = `
        UPDATE Users
        SET username = ?, date_joined = ?, role = ?
        WHERE user_id = ?
    `;
    const params = [username, date_joined, role, req.params.id];
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

// Script to delete a user
app.delete('/users/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Users
        WHERE user_id = ?
    `;
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

// Script to add a new comment
app.post('/comments', (req, res) => {
    const { plant_id, user_id, comment, date_posted } = req.body;
    const sql = `
        INSERT INTO Comments (plant_id, user_id, comment, date_posted)
        VALUES (?, ?, ?, ?)
    `;
    const params = [plant_id, user_id, comment, date_posted];
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

// Script to update a comment
app.put('/comments/:id', verifyUserOrAdmin, (req, res) => {
    const { plant_id, user_id, comment, date_posted } = req.body;
    const sql = `
        UPDATE Comments
        SET plant_id = ?, user_id = ?, comment = ?, date_posted = ?
        WHERE comment_id = ?
    `;
    const params = [plant_id, user_id, comment, date_posted, req.params.id];
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

// Script to delete a comment
app.delete('/comments/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Comments
        WHERE comment_id = ?
    `;
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

// Script to add a new image
app.post('/images', (req, res) => {
    const { plant_id, image_url, date_uploaded } = req.body;
    const sql = `
        INSERT INTO Images (plant_id, image_url, date_uploaded)
        VALUES (?, ?, ?)
    `;
    const params = [plant_id, image_url, date_uploaded];
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

// Script to update an image
app.put('/images/:id', verifyUserOrAdmin, (req, res) => {
    const { plant_id, image_url, date_uploaded } = req.body;
    const sql = `
        UPDATE Images
        SET plant_id = ?, image_url = ?, date_uploaded = ?
        WHERE image_id = ?
    `;
    const params = [plant_id, image_url, date_uploaded, req.params.id];
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

// Script to delete an image
app.delete('/images/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Images
        WHERE image_id = ?
    `;
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

// Script to add a new species
app.post('/species', (req, res) => {
    const { scientific_name, division, class: className, order, family, genus, species, common_name, season } = req.body;
    const sql = `
        INSERT INTO Species (scientific_name, division, class, order, family, genus, species, common_name, season)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [scientific_name, division, className, order, family, genus, species, common_name, season];
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

// Script to update a species
app.put('/species/:id', verifyUserOrAdmin, (req, res) => {
    const { scientific_name, division, class: className, order, family, genus, species, common_name, season } = req.body;
    const sql = `
        UPDATE Species
        SET scientific_name = ?, division = ?, class = ?, order = ?, family = ?, genus = ?, species = ?, common_name = ?, season = ?
        WHERE species_id = ?
    `;
    const params = [scientific_name, division, className, order, family, genus, species, common_name, season, req.params.id];
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

// Script to delete a species
app.delete('/species/:id', verifyUserOrAdmin, (req, res) => {
    const sql = `
        DELETE FROM Species
        WHERE species_id = ?
    `;
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