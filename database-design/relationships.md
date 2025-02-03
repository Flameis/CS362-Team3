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
* common_name: Name of the plant
* type: Type of the plant (e.g. tree, shrub, flower)
* description: Description of the plant
* location: Location of the plant
* season: Season of the plant
* avg_rating: Average rating of the plant
* date_added: Date the plant was added
* date_updated: Date the plant was updated

### Taxonomy
* taxo_id (Primary Key): Unique identifier for each species.
* scientific_name: Scientific name of the species
* family: Family of the species
* genus: Genus of the species

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

## CRUD (Create, Read, Update, Delete)
