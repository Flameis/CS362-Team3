const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();

const jsonFilePath = path.join(__dirname, 'landscapeplants.json');
const skippedFilePath = path.join(__dirname, 'skippedSpecies.json');

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
            console.log('Connected to the database.');
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

function main() {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    const skippedSpecies = [];
    const db = handleConnection();

    jsonData.species.forEach(species => {
        const { genus, species: speciesName, common_name } = species;
        if (!speciesName || !common_name) {
            skippedSpecies.push(species);
            return;
        }
        const sql = `
            INSERT INTO Species (genus, species, common_name)
            VALUES (?, ?, ?)
        `;
        const params = [genus, speciesName, common_name];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(`Error inserting species ${genus} ${speciesName}:`, err);
                skippedSpecies.push(species); // Add to skipped species if insertion fails
            } else {
                console.log(`Successfully inserted species ${genus} ${speciesName}`);
            }
        });
    });

    fs.writeFileSync(skippedFilePath, JSON.stringify({ skippedSpecies }, null, 2));
    console.log(`Skipped species have been logged to ${skippedFilePath}`);
}

main();
