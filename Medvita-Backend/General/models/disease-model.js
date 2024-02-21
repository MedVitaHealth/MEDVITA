const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
    name: {type: String, required: true, unique: true},
    symptoms: {type: String},
    description: {type: String},
    treatment: {type: String},
    prevention: {type: String},
    affected: [{type: mongoose.Types.ObjectId, ref: 'DiseaseLocation'}]
});


module.exports = mongoose.model('Disease', diseaseSchema);
    