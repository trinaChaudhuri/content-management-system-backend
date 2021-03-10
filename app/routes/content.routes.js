module.exports = (app) => {
    const content = require('../controllers/content.controller');
    // Create a new Note
    app.post('/notes', content.create);

    // Retrieve all Notes
    app.get('/notes', content.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', content.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', content.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', content.delete);

    
}