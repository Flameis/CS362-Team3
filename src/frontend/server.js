const express = require('express');
const path = require('path');
const app = express();
const port = 3306;

// Serve the static files from the frontend directory
app.use(express.static(path.join(__dirname)));

// Serve the display-plants.html file
app.get('/plants', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/display-plants.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Frontend server is running on http://localhost:${port}`);
});