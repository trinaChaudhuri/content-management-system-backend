const User =require("../models/content.model");

//user sign up
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const user = new User({
        email: req.body.email || "Untitled Note", 
        password: req.body.password
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating profile."
        });
    });
};