const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});


module.exports = mongoose.model('Content', ContentSchema);
