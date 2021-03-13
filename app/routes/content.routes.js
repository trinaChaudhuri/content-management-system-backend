var cors = require('cors');
var express=require("express");
var expresss=express();
expresss.use(cors());
module.exports = (app) => {
    const content = require('../controllers/content.controller');
    
    // Create a new Note
    app.post('/notes',cors(), content.create);

    // Retrieve all Notes
    app.get('/notes/:userId',cors(), content.findNotesByUserId);

    app.get('/notes',cors(),content.findAllNotes);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId',cors(), content.getContentById);

    // Update a Note with noteId
    app.put('/notes/:noteId',cors(),content.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId',cors(),content.delete);

    // create user
    app.post('/signup',cors(),content.createuser);   
    
    // verify user
    app.post('/login',cors(),content.verifyuser);
}

