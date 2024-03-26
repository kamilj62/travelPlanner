const router = require('express').Router();
const { Trip } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allTrips = await Trip.findAll();
    res.status(200).json(allTrips);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a trip
router.post('/', async (req, res) => {
  try {
    const tripData = await Trip.create(req.body);
    res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
