// Environment Variable Configuration
require('dotenv').config();

// Third party imports
const jwt = require('jsonwebtoken');

// Local imports
const HttpError = require('../models/http-error');


const checkAuth = async (req, res, next) => {
    if (req.method === 'OPTIONS'){ // OPTIONS is a default method sent by the browser to check if the server is up and running
        return next();
    }
    let token;
    try {
        token = req.headers.authorization.split(' ')[1] // Bearer TOKEN
        if (!token) {
            throw new Error('Authentication failed');
        }
        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        const error = new HttpError('Authentication failed', 403);
        return next(error);
    }
};

module.exports = checkAuth;
