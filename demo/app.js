// Filename - demo/app.js

const path = require('path');
const express = require("express");
const app = express();
const api = require('./src/backend/api');

api(app); // Call the function exported by api.js
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

// Serve the display-plants.html file
app.get('/plants', (req, res) => {
    res.sendFile(path.join(__dirname, './src/frontend-legacy/pages/display-plants.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});