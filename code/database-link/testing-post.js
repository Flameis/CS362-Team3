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
app.put('/plants/:id', (req, res) => {
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
app.delete('/plants/:id', (req, res) => {
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