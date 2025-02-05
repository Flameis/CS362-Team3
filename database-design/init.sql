CREATE TABLE User (
    user_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    date_joined DATE NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE Taxonomy (
    taxo_id INTEGER PRIMARY KEY,
    common_name TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    division TEXT NOT NULL,
    class TEXT NOT NULL,
    order TEXT NOT NULL,
    family TEXT NOT NULL,
    genus TEXT NOT NULL,
    species TEXT NOT NULL
);

CREATE TABLE Plants (
    plant_id INTEGER PRIMARY KEY,
    taxo_id INTEGER,
    image_id INTEGER,
    description TEXT,
    location TEXT NOT NULL,
    season TEXT,
    avg_rating REAL,
    date_added DATE NOT NULL,
    date_updated DATE,
    x_coordinate INTEGER NOT NULL,
    y_coordinate INTEGER NOT NULL,
    FOREIGN KEY (taxo_id) REFERENCES Taxonomy(taxo_id),
    FOREIGN KEY (image_id) REFERENCES Images(image_id)
);

CREATE TABLE Images (
    image_id INTEGER PRIMARY KEY,
    plant_id INTEGER,
    image_url TEXT NOT NULL,
    date_uploaded DATE NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id)
);

CREATE TABLE Comments (
    comment_id INTEGER PRIMARY KEY,
    plant_id INTEGER,
    user_id INTEGER,
    comment TEXT NOT NULL,
    date_posted DATE NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Ratings (
    rating_id INTEGER PRIMARY KEY,
    plant_id INTEGER,
    user_id INTEGER,
    rating INTEGER NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
