const mongoose = require('mongoose');

const Post = mongoose.Schema({
    title: String,
    body: String
});;

module.exports = mongoose.model('Post', Post);