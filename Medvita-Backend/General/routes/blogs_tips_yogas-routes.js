const express = require('express'); 

const blogsTipsYogasController = require('../controllers/blogs_tips_yogas-controller');

const router = express.Router();



// -----------------------Routes-----------------------//

// get blogs
router.get('/get-blogs', blogsTipsYogasController.getBlogs);

// get tips
router.get('/get-tips', blogsTipsYogasController.getTips);

// get yoga
router.get('/get-yoga', blogsTipsYogasController.getYoga);

// Exporting
module.exports = router;

