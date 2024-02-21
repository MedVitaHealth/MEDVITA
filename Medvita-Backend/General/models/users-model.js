const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    posts : [{type: mongoose.Types.ObjectId, required: true, ref: 'Post'}]
});

module.exports = mongoose.model('User', userSchema);