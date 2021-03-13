const { db } = require('../models/content.model.js');
const Note = require('../models/content.model.js');
const User = require("../models/user.model.js");
// Create and Save a new Note
exports.create = async (req, res) => {
    // Validate request
    if(!req.body.title) {
        res.status(400).send({
            message: "Note title can not be empty"
        });
        return;
    }

    if(!req.body.userId) {
        res.status(400).json({message: 'userid required'})
        return;
    }

    const user = await getUserById(req.body.userId);

    if(!user._id) {
        res.status(401).json({message: 'user not found'});
    }

    

    // Create a Note
    const note = new Note({
        title: req.body.title , 
        content: req.body.content || "Untitled Note",
        userId: req.body.userId,
        userEmail: user.email
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes of one user.
exports.findNotesByUserId = (req, res) => {
    if(!validateUserId(req.query.userId)) {
        res.status(401).json({message: 'user not found'});
    }
    Note.find({userId: req.query.userId})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//retrieve all notes of all users
exports.findAllNotes =(req,res) => {
    Note.find().sort({_id:-1})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}


// Find a single note with a noteId
exports.getContentById = async (req, res) => {
    if(!validateUserId(req.query.userId)) {
        res.status(401).json({message: 'user not found'});
    }
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};



// create user
exports.createuser = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Create a Note
    const user = new User({
        email: req.body.email ,
        password: req.body.password
    });
    
    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the profile."
        });
    });
};

//verify user
exports.verifyuser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        res.status(400).json({message: 'email or password field empty'})
    }

    const user = await User.findOne({email, password});


    if(!user) {
        res.status(401).json({message: 'authentication failed'});
        return;
    }

    res.json({
        message: 'login successfull',
        userId: user._id
    });
};

async function validateUserId(id) {
    const user = await User.findById(id);
    return user._id ? true : false;
}

async function getUserById(id) {
    const user = await User.findById(id);
    return user;
}

