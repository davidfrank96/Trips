const express = require('express');
const TripController = require('../controllers/trip');

const router = express.Router();


router.post('/', TripController.createTrip);
router.get('/', TripController.getTrips);
router.patch('/:tripId', TripController.patchTrip);


module.exports = router;
