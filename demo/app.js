// Filename - demo/app.js

const PORT = process.env.PORT || 8080;

const path = require('path');
const express = require("express");
const app = express();
const api = require('./src/backend/api');

api(app); // Call the function exported by api.js
app.use(express.json());

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

// Serve the display-plants.html file
app.get('/plants', (req, res) => {
    res.sendFile(path.join(__dirname, './src/frontend-legacy/pages/display-plants.html'));
});

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);