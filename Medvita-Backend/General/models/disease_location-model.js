const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diseaseLocationSchema = new Schema({
    disease: {type: String, required: true},
    date: {type: Date, expires: '30d', required: true, default: Date.now()},
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    }
});

module.exports = mongoose.model('DiseaseLocation', diseaseLocationSchema);