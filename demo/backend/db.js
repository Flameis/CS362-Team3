const mysql = require('mysql');
require('dotenv').config();

// Print environment variables to ensure they are correct
console.log('Environment Variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

function handleConnection() {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectTimeout: 60000, // 60 seconds timeout
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

    // Keep the connection alive
    setInterval(() => {
        db.query('SELECT 1', (err) => {
            if (err) {
                console.error('Error keeping the connection alive:', err.message);
            }
        });
    }, 5000); // Ping every 5 seconds

    return db;
}

const db = handleConnection();
module.exports = db;
