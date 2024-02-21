const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Disease = require('../models/disease-model');
const DiseaseLocation = require('../models/disease_location-model');
const User = require('../models/users-model');



// add to map
const addToMap = async (req, res, next) => {
    const { disease, lat, lng, creator } = req.body;

    let user;
    try {
        user = await User.findById(creator, 'userId') // toOb
    }
    catch (err) {
        const error = new HttpError('Adding to map failed, please try again', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }

    if (creator !== req.userData.userId) {
        const error = new HttpError('You are not allowed to add to the map', 401);
        return next(error);
    }

    let existingDisease;
    try {
        existingDisease = await Disease.findOne({ name: disease });
    }
    catch (err) {
        const error = new HttpError('Adding to map failed, please try again', 500);
        return next(error);
    }

    if (!existingDisease) {
        const error = new HttpError('Could not find disease for the provided name', 404);
        return next(error);
    }

    let newDiseaseLocation = new DiseaseLocation({
        disease: disease,
        location: {
            lat: lat,
            lng: lng
        },
        creator: creator
    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newDiseaseLocation.save({ session: sess });
        existingDisease.affected.push(newDiseaseLocation);
        await existingDisease.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        const error = new HttpError('Adding to map failed, please try again', 500);
        return next(error);
    }

    res.status(201).json({ diseaseLocation: newDiseaseLocation });
}



// get disease locations
const getDiseaseLocations = async (req, res, next) => {
    const disease = req.params.disease;

    let disease_;
    try {
        disease_ = await Disease.findOne({ name: disease }).populate('affected');
    }
    catch (err) {
        const error = new HttpError('Fetching disease locations failed, please try again', 500);
        return next(error);
    }

    if (!disease_ || disease_.length === 0) {
        const error = new HttpError('Could not find disease locations for the provided disease', 404);
        return next(error);
    }

    let affected = disease_.affected.map(diseaseLocation => diseaseLocation.toObject({ getters: true }));

    res.json({ diseaseLocations: affected });
}



// delete from map
const deleteFromMap = async (req, res, next) => {
    const diseaseLocationId = req.params.diseaseLocationId;
    const uid = req.userData.userId;

    let diseaseLocation;
    try {
        diseaseLocation = await DiseaseLocation.findById(diseaseLocationId).populate('creator');
    }
    catch (err) {
        const error = new HttpError('Deleting from map failed, please try again', 500);
        return next(error);
    }

    if (!diseaseLocation) {
        const error = new HttpError('Could not find disease location for this id', 404);
        return next(error);
    }

    if (diseaseLocation.creator.id !== uid) {
        const error = new HttpError('You are not allowed to delete this disease location', 401);
        return next(error);
    }

    let disease;
    try{
        disease = await Disease.findOne({name: diseaseLocation.disease}).populate('affected');
    }
    catch (err) {
        const error = new HttpError('Deleting from map failed, please try again', 500);
        return next(error);
    }

    if (!disease) {
        const error = new HttpError('Could not find disease for this location', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await diseaseLocation.deleteOne({ session: sess });
        disease.affected.pull(diseaseLocation);
        await disease.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        const error = new HttpError('Deleting from map failed, please try again', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted disease location' });
}


exports.addToMap = addToMap;
exports.getDiseaseLocations = getDiseaseLocations;
exports.deleteFromMap = deleteFromMap;
