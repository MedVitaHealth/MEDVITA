const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const communitySchema = new Schema({
    name: {type: String, unqiue: true, required: true},
    posts: [{type: mongoose.Types.ObjectId, required: true, ref: 'Post'}],
});

module.exports = mongoose.model('Community', communitySchema);