const express = require('express'); 

const checkAuth = require('../middlewares/check-auth');
const mapsController = require('../controllers/maps-controller');

const router = express.Router();



// -----------------------Routes-----------------------//


// get disease locations
router.get('/get-disease-locations/:disease', mapsController.getDiseaseLocations);


// -----------------------Protected Routes-----------------------//
// check auth
router.use(checkAuth);

// add to map
router.post('/add-to-map', mapsController.addToMap);

// delete from map
router.delete('/delete-from-map/:diseaseLocationId', mapsController.deleteFromMap);


// Exporting
module.exports = router;
