const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true, minlength: 6},
    profile_pic: {type: String},
    phone: {type: String},
    address: {
        street: {type: String},
        city: {type: String},
        state: {type: String},
        zip: {type: String},
        lat: {type: Number},
        lng: {type: Number}
    },
});

userSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $type: 'string' } } });
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);