const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    creatorName: {type: String, required: true},
    date: {type: Date, required: true},
    upVoters: [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}],
    upVotes: {type: Number, required: true},    
    community: {type: String, required: true},
});

module.exports = mongoose.model('Post', postSchema);