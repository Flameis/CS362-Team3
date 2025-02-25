const express = require("express");
const app = express();

const port = process.env.API_PORT || 8081;

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const plantRoutes = require('./routes/plants');
const commentRoutes = require('./routes/comments');
const imageRoutes = require('./routes/images');
const speciesRoutes = require('./routes/species');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/species', speciesRoutes);

// Root route
app.get('/api', (req, res) => {
    res.send('Welcome to the Beaver Botanica API');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});