const mongoose = require('mongoose');

const CreateUserSchema = mongoose.Schema({
    email:String,
    password:String
},{
    timestamps: true
});

module.exports = mongoose.model('User',CreateUserSchema);