// Filename - demo/app.js

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

// Redirect any request to /api to the API server
app.use('/api', (req, res) => {
    res.redirect(`http://localhost:${process.env.API_PORT || 8080}${req.originalUrl}`);
});

// Serve the display-plants.html file
app.get('/plants', (req, res) => {
    res.sendFile(path.join(__dirname, './src/frontend-legacy/pages/display-plants.html'));
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});