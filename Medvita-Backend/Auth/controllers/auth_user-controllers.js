// Environment Variable Configuration
require('dotenv').config();

// Third party imports
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Local imports
const HttpError = require('../models/http-error');
const User = require('../models/users');

const blobToBase64 = require('../utils/blob-base64');



//-----------------------Controllers-----------------------//


const signup = async (req, res, next) => {
    // Extracting data from the request
    const {name, email, password} = req.body;

    // Checking if the user already exists
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    }
    catch(err){
        const error = new HttpError('Signup failed, please try again later!', 500);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError('User already exists, please login instead!', 422);
        return next(error);
    }

    // Hashing the password
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch(err){
        const error = new HttpError('Could not create user, please try again!', 500);
        return next(error);
    }

    // Creating a new user
    const createdUser = new User({
        name,
        email,
        password: hashedPassword
    });


    // Saving the user to the database
    try{
        await createdUser.save();
    }
    catch(err){
        const error = new HttpError('Signup failed, please try again later!', 500);
        return next(error);
    }

    // Creating a token
    let token;
    try{
        token = jwt.sign(
            {userId: createdUser.id, email: createdUser.email},
            process.env.JWT_KEY,
            {expiresIn: '720h'}
        );
    }
    catch(err){
        const error = new HttpError('Signup failed, please try again later!', 500);
        return next(error);
    }

    // Sending the response
    res.status(201).json({userId: createdUser.id, email: createdUser.email, token: token});
}



const login = async (req, res, next) => {
    // Extracting data from the request
    const {email, password} = req.body;

    // Checking if the user exists
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    }
    catch(err){
        const error = new HttpError('Login failed, please try again later!', 500);
        return next(error);
    }

    if(!existingUser){
        const error = new HttpError('Invalid credentials, could not log you in!', 403);
        return next(error);
    }

    // Checking if the password is correct
    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    }
    catch(err){
        const error = new HttpError('Could not log you in, please check your credentials and try again!', 500);
        return next(error);
    }

    if(!isValidPassword){
        const error = new HttpError('Invalid credentials, could not log you in!', 403);
        return next(error);
    }

    // Creating a token
    let token;
    try{
        token = jwt.sign(
            {userId: existingUser.id, email: existingUser.email},
            process.env.JWT_KEY,
            {expiresIn: '720h'}
        );
    }
    catch(err){
        const error = new HttpError('Login failed, please try again later!', 500);
        return next(error);
    }

    // Sending the response
    res.status(200).json({userId: existingUser.id, email: existingUser.email, token: token});
}



const getUser = async (req, res, next) => {
    // Extracting data from the request
    const userId = req.params.uid;

    // Finding the user
    let user;
    try{
        user = await User.findById(userId, '-password');
    }
    catch(err){
        const error = new HttpError('Error in finding user!', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('Could not find user for the provided id!', 404);
        return next(error);
    }

    if (user.id !== req.userData.userId) {
        const error = new HttpError('You are not allowed to view this user!', 401);
        return next(error);
    }

    // Sending the response
     res.status(200).json({user: user.toObject({getters: true})});
}




// Updating user
const updateUser = async (req, res, next) => {
    // Extracting data from the request
    const userId = req.params.uid;
    const {name, phone, address} = req.body;

    // Finding the user
    let user;
    try{
        user = await User.findById(userId, '-password');
    }
    catch(err){
        const error = new HttpError('Error in finding user!', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('Could not find user for the provided id!', 404);
        return next(error);
    }

    if (user.id !== req.userData.userId) {
        const error = new HttpError('You are not allowed to edit this user!', 401);
        return next(error);
    }

    
    // Updating the user
    (name == "" || name == undefined) ? user.name = user.name : user.name = name;
    (phone == "" || phone == undefined) ? user.phone = user.phone : user.phone = phone;
    (address == {} || address == undefined) ? user.address = user.address : user.address = address;
    

    let imageBase64;
    if (req.files.length == 0 || !req.files[0] || !req.files[0].mimetype.startsWith('image')) {
        console.log('No image found');
    }
    else {
        imageBase64 = await blobToBase64(req.files[0]);
        if (imageBase64 && imageBase64 != "") {
            user.profile_pic = imageBase64;
        }
    }

    // Saving the user
    try{
        await user.save();
    }
    catch(err){
        const error = new HttpError('Error in updating user!', 500);
        return next(error);
    }

    // Sending the response
    res.status(200).json({user: user.toObject({getters: true})});
}



// Exporting
exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.updateUser = updateUser;
