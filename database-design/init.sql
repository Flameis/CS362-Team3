DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Images;
DROP TABLE IF EXISTS Plants;
DROP TABLE IF EXISTS Species;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    date_joined DATE NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE Species (
    species_id INTEGER PRIMARY KEY,
    common_name TEXT NOT NULL,
--     scientific_name TEXT NOT NULL, -- generate this
    species TEXT NOT NULL,
    genus TEXT NOT NULL,
    family TEXT NOT NULL,
    ordo TEXT NOT NULL,
    class TEXT NOT NULL,
    division TEXT NOT NULL -- related to phylum
);

CREATE TABLE Plants (
    plant_id INTEGER PRIMARY KEY,
    species_id INTEGER,
    image_id INTEGER,
    description TEXT,
    location TEXT NOT NULL,
    season TEXT,
    avg_rating REAL,
    date_added DATE NOT NULL,
    date_updated DATE,
    x_coordinate INTEGER NOT NULL,
    y_coordinate INTEGER NOT NULL,
    FOREIGN KEY (species_id) REFERENCES Species(species_id)
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
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ratings (
    rating_id INTEGER PRIMARY KEY,
    plant_id INTEGER,
    user_id INTEGER,
    rating INTEGER NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
