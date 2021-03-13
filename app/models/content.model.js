const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true
    },
    title: {
        type:String,
        required:true
    },
    content: {
        type:String
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Content', ContentSchema);
