# Outline:
## Entities and Attributes

### User
* user_id (Primary Key): Unique identifier for each user.
* username: Customizable name for users
* date_joined: Date the user joined
* role: (admin/user)

### Plants
* plant_id (Primary Key): Unique identifier for each plant.
* taxo_id (Foreign Key): Unique identifier for each species
* image_id (Foreign Key): Unique identifier for each image
* description: Description of the plant
* location: Location of the plant
* season: Season of the plant
* avg_rating: Average rating of the plant
* date_added: Date the plant was added
* date_updated: Date the plant was updated
* x_coordinate: X coordinate of the plant's location
* y_coordinate: Y coordinate of the plant's location

### Taxonomy
* taxo_id (Primary Key): Unique identifier for each species.
* scientific_name: Scientific name of the species
* division: Taxonomic division of the plant
* class: Taxonomic class of the plant
* order: Taxonomic order of the plant
* family: Taxonomic family of the plant
* genus: Taxonomic genus of the plant
* species: Taxonomic species of the plant
* common_name: Name of the plant

### Images
* image_id (Primary Key): Unique identifier for each image.
* plant_id (Foreign Key): Unique identifier for each plant
* image_url: URL of the image
* date_uploaded: Date the image was uploaded

### Comments
* comment_id (Primary Key): Unique identifier for each comment.
* plant_id (Foreign Key): Unique identifier for each plant
* user_id (Foreign Key): Unique identifier for each user
* comment: Comment on the plant
* date_posted: Date the comment was posted

### Ratings
* rating_id (Primary Key): Unique identifier for each rating.
* plant_id (Foreign Key): Unique identifier for each plant
* user_id (Foreign Key): Unique identifier for each user
* rating: Rating of the plant

## Potential Relationships

Created by - One to Many relationship between User and Plants\
Posted by - One to Many relationship between User and Comments\
Rated by - One to Many relationship between User and Ratings\
Belongs to - One to One relationship between Plants and Taxonomy\
Has - One to Many relationship between Plants and Images\
Has - One to Many relationship between Plants and Comments\
Has - One to Many relationship between Plants and Ratings

## CRUD (Create, Read, Update, Delete)

### User
* Create: 
  ```sql
  INSERT INTO User (user_id, username, date_joined, role) VALUES (?, ?, ?, ?);
  ```
* Read: 
  ```sql
  SELECT * FROM User WHERE user_id = ?;
  ```
* Update: 
  ```sql
  UPDATE User SET username = ?, date_joined = ?, role = ? WHERE user_id = ?;
  ```
* Delete: 
  ```sql
  DELETE FROM User WHERE user_id = ?;
  ```

### Plants
* Create: 
  ```sql
  INSERT INTO Plants (plant_id, taxo_id, image_id, common_name, description, location, season, avg_rating, date_added, date_updated, x_coordinate, y_coordinate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  ```
* Read: 
  ```sql
  SELECT * FROM Plants WHERE plant_id = ?;
  ```
* Update: 
  ```sql
  UPDATE Plants SET taxo_id = ?, image_id = ?, common_name = ?, description = ?, location = ?, season = ?, avg_rating = ?, date_added = ?, date_updated = ?, x_coordinate = ?, y_coordinate = ? WHERE plant_id = ?;
  ```
* Delete: 
  ```sql
  DELETE FROM Plants WHERE plant_id = ?;
  ```

### Taxonomy
* Create: 
  ```sql
  INSERT INTO Taxonomy (taxo_id, scientific_name, division, class, order, family, genus, species) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  ```
* Read: 
  ```sql
  SELECT * FROM Taxonomy WHERE taxo_id = ?;
  ```
* Update: 
  ```sql
  UPDATE Taxonomy SET scientific_name = ?, division = ?, class = ?, order = ?, family = ?, genus = ?, species = ? WHERE taxo_id = ?;
  ```
* Delete: 
  ```sql
  DELETE FROM Taxonomy WHERE taxo_id = ?;
  ```

### Images
* Create: 
  ```sql
  INSERT INTO Images (image_id, plant_id, image_url, date_uploaded) VALUES (?, ?, ?, ?);
  ```
* Read: 
  ```sql
  SELECT * FROM Images WHERE image_id = ?;
  ```
* Update: 
  ```sql
  UPDATE Images SET plant_id = ?, image_url = ?, date_uploaded = ? WHERE image_id = ?;
  ```
* Delete: 
  ```sql
  DELETE FROM Images WHERE image_id = ?;
  ```

### Comments
* Create: 
  ```sql
  INSERT INTO Comments (comment_id, plant_id, user_id, comment, date_posted) VALUES (?, ?, ?, ?, ?);
  ```
* Read: 
  ```sql
  SELECT * FROM Comments WHERE comment_id = ?;
  ```
* Update: 
  ```sql
  UPDATE Comments SET plant_id = ?, user_id = ?, comment = ?, date_posted = ? WHERE comment_id = ?;
  ```
* Delete: 
  ```sql
  DELETE FROM Comments WHERE comment_id = ?;
  ```

### Ratings
* Create: 
  ```sql
  INSERT INTO Ratings (rating_id, plant_id, user_id, rating) VALUES (?, ?, ?, ?);
  ```
* Read: 
  ```sql
  SELECT * FROM Ratings WHERE rating_id = ?;
  ```
* Update: 
  ```sql
  UPDATE Ratings SET plant_id = ?, user_id = ?, rating = ? WHERE rating_id = ?;
  ```
* Delete: 
  ```sql
  DELETE FROM Ratings WHERE rating_id = ?;
  ```
