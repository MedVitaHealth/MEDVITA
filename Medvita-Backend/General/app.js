// Environment Variable Configuration
require('dotenv').config();

// Third party imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Local imports
const HttpError = require('./models/http-error');
const communityRoutes = require('./routes/community-routes');
const blogsTipsYogasRoutes = require('./routes/blogs_tips_yogas-routes');
const mapsRoutes = require('./routes/maps-routes');

// Initializing
const app = express();




//-----------------------Middlewares-----------------------//


// Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow access to any domain
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    ); // Allow these headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE'); // Allow these methods
    next();
});


//serving static files
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/videos', express.static(path.join(__dirname,'videos')));




// Routes middleware initialization
app.use('/api/community', communityRoutes);
app.use('/api/blogs-tips-yogas', blogsTipsYogasRoutes);
app.use('/api/maps', mapsRoutes);


// Page not found middleware
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error; 
});


// Error handling middleware
app.use((error, req, res, next) => {
    // Checking if the response has already been sent
    if(res.headerSent){
        return next(error);
    }
    // Sending the error
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});









const port = process.env.PORT || 8000;
const URL = process.env.MONGO_URL;

// Server initialization
mongoose.connect(URL).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}....`);
    });
}).catch(err =>{
    console.log(err);
})