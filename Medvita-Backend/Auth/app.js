// Environment Variable Configuration
require('dotenv').config();

// Third party imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

// Local imports
const HttpError = require('./models/http-error');
const authUserRoutes = require('./routes/auth_user-routes');


// Initializing
const app = express();


//-----------------------Middlewares-----------------------//


// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow access to any domain
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
  ); // Allow these headers
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE'); // Allow these methods
  next();
});


// Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Multer middleware
const parseFormDataMiddleware = multer({
    dest: './uploads',
    limits: {
      fileSize: 1024 * 1024 * 20 // 20MB
    },
    fileFilter(req, file, cb) {
      if (!file) {
        next();
      }
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload an image'))
      }
      cb(undefined, true)
    },
    onError(err, next) {
      console.log(err)
      next(err)
    },
});

app.use(parseFormDataMiddleware.any());



// Routes middleware initialization
app.use('/api/auth', authUserRoutes); // Routes for user authentication

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