// Third party imports
const express = require('express');
const {check} = require('express-validator');

// Local imports
const authUserController = require('../controllers/auth_user-controllers');
const checkAuth = require('../middlewares/check-auth');

// Initializing
const router = express.Router();


//-----------------------Routes-----------------------//


// @route   POST auth/signup
router.post(
    '/signup', 
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min: 6})
    ],
    authUserController.signup
);


// @route   POST auth/login
router.post(
    '/login',
    [
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min: 6})
    ],
    authUserController.login
);


router.use(checkAuth); // Middleware to check if the user is authenticated


// @route   GET auth/get_user
router.get('/get_user/:uid', authUserController.getUser);


// @route   PATCH auth/update_user
router.patch(
    '/update_user/:uid',
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail()
    ],
    authUserController.updateUser
);



// Exporting
module.exports = router;