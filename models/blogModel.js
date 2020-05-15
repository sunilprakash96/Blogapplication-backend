const mongoose = require('mongoose');

//Creation of Model for Blog.
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    Date: { type: Date, default: Date.now }
});

//Creation of Collection 
const Post = mongoose.model('Post', Schema);

module.exports = Post;