const eventEmitter = require('./database-link/event-listeners');

eventEmitter.emit('addPlant', {
    species_id: 1,
    image_id: 2,
    description: 'A beautiful plant',
    location: 'Garden',
    season: 'Spring',
    avg_rating: 4.5,
    date_added: new Date(),
    date_updated: new Date(),
    x_coordinate: 10.123,
    y_coordinate: 20.456
});
