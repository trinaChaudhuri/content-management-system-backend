var cors = require('cors');
var express=require("express");
var expresss=express();
expresss.use(cors());
module.exports = (app) => {
    const content = require('../controllers/content.controller');
    
    // Create a new Note
    app.post('/notes',cors(), content.create);

    // Retrieve all Notes posted by user
    app.get('/notes/:userId',cors(), content.findNotesByUserId);

    // retrieve all notes posted by anyone
    app.get('/notes',cors(),content.findAllNotes);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId',cors(), content.getContentById);

    // create user
    app.post('/signup',cors(),content.createuser);   
    
    // verify user
    app.post('/login',cors(),content.verifyuser);
}

