use mthopeac_OSU_PlantMap;

DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Images;
DROP TABLE IF EXISTS Plants;
DROP TABLE IF EXISTS Species;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    date_joined DATE NOT NULL,
    role TEXT NOT NULL
)ENGINE=InnoDB;

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
    x_coordinate DECIMAL(17, 14) NOT NULL,
    y_coordinate DECIMAL(17, 14) NOT NULL,
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