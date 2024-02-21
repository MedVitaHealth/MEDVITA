const HttpError = require('../models/http-error');

const Blogs = require('../data/blogs');
const Tips = require('../data/tips');
const Yoga = require('../data/yoga');



const getBlogs = async (req, res, next) => {
    try {
        res.json({blogs: Blogs});
    }
    catch(err) {
        const error = new HttpError('Could not fetch blogs, please try again later', 500);
        return next(error);
    }
}


const getTips = async (req, res, next) => {
    try {
        res.json({tips: Tips});
    }
    catch(err) {
        const error = new HttpError('Could not fetch tips, please try again later', 500);
        return next(error);
    }
}


const getYoga = async (req, res, next) => {
    try {
        res.json({yoga: Yoga});
    }
    catch(err) {
        const error = new HttpError('Could not fetch yoga poses, please try again later', 500);
        return next(error);
    }
}



exports.getBlogs = getBlogs;
exports.getTips = getTips;
exports.getYoga = getYoga;
