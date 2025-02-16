const EventEmitter = require('events');
const dbLink = require('./api');
const eventEmitter = new EventEmitter();

// Database connection
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

// Add plant event
eventEmitter.on('addPlant', (plant) => {
    const sql = 'INSERT INTO Plants (species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [plant.species_id, plant.image_id, plant.description, plant.location, plant.season, plant.avg_rating, plant.date_added, plant.date_updated, plant.x_coordinate, plant.y_coordinate];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error adding plant:', err.message);
        } else {
            console.log('Plant added successfully.');
        }
    });
});

module.exports = eventEmitter;
