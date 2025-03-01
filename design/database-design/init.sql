use mthopeac_OSU_PlantMap;

DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Images;
DROP TABLE IF EXISTS Plants;
DROP TABLE IF EXISTS Species;

/* CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    date_joined DATE NOT NULL,
    role TEXT NOT NULL
)ENGINE=InnoDB; */

CREATE TABLE Species (
    species_id INT PRIMARY KEY AUTO_INCREMENT,
    common_name TEXT NOT NULL,
    species TEXT NOT NULL,
    genus TEXT NOT NULL,
    family TEXT NOT NULL,
    ordo TEXT NOT NULL,
    class TEXT NOT NULL,
    division TEXT NOT NULL
);

CREATE TABLE Plants (
    plant_id INT PRIMARY KEY AUTO_INCREMENT,
    species_id INT NOT NULL,
    image_id INT NOT NULL,
    description TEXT,
    location TEXT,
    season TEXT NOT NULL,
    avg_rating REAL,
    date_added DATE NOT NULL,
    date_updated DATE,
    x_coordinate INT NOT NULL,
    y_coordinate INT NOT NULL,
    FOREIGN KEY (species_id) REFERENCES Species(species_id)
);

CREATE TABLE Images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    plant_id INT,
    image_url TEXT NOT NULL,
    date_uploaded DATE NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id)
);

CREATE TABLE Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    plant_id INT,
    user_id INT,
    comment TEXT NOT NULL,
    date_posted DATE NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ratings (
    rating_id INT PRIMARY KEY AUTO_INCREMENT,
    plant_id INT,
    user_id INT,
    rating INT NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Trigger to update avg_rating in Plants table
DELIMITER //
CREATE TRIGGER update_avg_rating
AFTER INSERT ON Ratings
FOR EACH ROW
BEGIN
    DECLARE new_avg_rating REAL;
    SELECT AVG(rating) INTO new_avg_rating FROM Ratings WHERE plant_id = NEW.plant_id;
    UPDATE Plants SET avg_rating = new_avg_rating WHERE plant_id = NEW.plant_id;
END;
//
DELIMITER ;

-- Trigger to update avg_rating in Plants table on update
DELIMITER //
CREATE TRIGGER update_avg_rating_on_update
AFTER UPDATE ON Ratings
FOR EACH ROW
BEGIN
    DECLARE new_avg_rating REAL;
    SELECT AVG(rating) INTO new_avg_rating FROM Ratings WHERE plant_id = NEW.plant_id;
    UPDATE Plants SET avg_rating = new_avg_rating WHERE plant_id = NEW.plant_id;
END;
//
DELIMITER ;

-- AI-Generated test data for now

-- Insert test data into Species table
INSERT INTO Species (common_name, species, genus, family, ordo, class, division) VALUES
    ('Common Oak', 'Quercus robur', 'Quercus', 'Fagaceae', 'Fagales', 'Magnoliopsida', 'Magnoliophyta'),
    ('Silver Birch', 'Betula pendula', 'Betula', 'Betulaceae', 'Fagales', 'Magnoliopsida', 'Magnoliophyta'),
    ('Norway Maple', 'Acer platanoides', 'Acer', 'Sapindaceae', 'Sapindales', 'Magnoliopsida', 'Magnoliophyta'),
    ('European Beech', 'Fagus sylvatica', 'Fagus', 'Fagaceae', 'Fagales', 'Magnoliopsida', 'Magnoliophyta'),
    ('Scots Pine', 'Pinus sylvestris', 'Pinus', 'Pinaceae', 'Pinales', 'Pinopsida', 'Pinophyta');

-- Insert test data into Plants table
INSERT INTO Plants (species_id, image_id, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate) VALUES
    (1, 1, 'A large oak tree', 'Central Park', 'Spring', 4.5, '2023-01-01', '2023-01-01', 10, 20),
    (2, 2, 'A beautiful birch tree', 'North Garden', 'Summer', 4.0, '2023-01-02', '2023-01-02', 15, 25),
    (3, 3, 'A tall maple tree', 'East Lawn', 'Fall', 4.2, '2023-01-03', '2023-01-03', 20, 30),
    (4, 4, 'A majestic beech tree', 'West Field', 'Winter', 4.8, '2023-01-04', '2023-01-04', 25, 35),
    (5, 5, 'A sturdy pine tree', 'South Forest', 'Spring', 4.7, '2023-01-05', '2023-01-05', 30, 40);

-- Insert test data into Images table
INSERT INTO Images (plant_id, image_url, date_uploaded) VALUES
    (1, 'http://example.com/oak.jpg', '2023-01-01'),
    (2, 'http://example.com/birch.jpg', '2023-01-02'),
    (3, 'http://example.com/maple.jpg', '2023-01-03'),
    (4, 'http://example.com/beech.jpg', '2023-01-04'),
    (5, 'http://example.com/pine.jpg', '2023-01-05');

-- Insert test data into Comments table
INSERT INTO Comments (plant_id, user_id, comment, date_posted) VALUES
    (1, 1, 'Beautiful oak tree!', '2023-01-01'),
    (2, 2, 'Love this birch tree.', '2023-01-02'),
    (3, 3, 'Amazing maple tree.', '2023-01-03'),
    (4, 4, 'Stunning beech tree.', '2023-01-04'),
    (5, 5, 'Great pine tree.', '2023-01-05');

-- Insert test data into Ratings table
INSERT INTO Ratings (plant_id, user_id, rating) VALUES
    (1, 1, 5),
    (2, 2, 4),
    (3, 3, 4),
    (4, 4, 5),
    (5, 5, 5);
