const router = require('express').Router();
const { Trip } = require('../../../Main/models');
const { Location, Travrller, Trjip } = require('../../models');

// get all routes
router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single location
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{ model: Travrller, through: Trip }]
    });
    if (!locationData) {
      res.status(404).json({ message: 'No locaiton found with thid id' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create location
router.post('/', async (req, res) => {
  try {
    const locationData = await Location.create(req.body);
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete location
router.delete('/:id', async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: { id: req.params.id }
    });
    if (!locationData) {
      res.status(404).json({ msg: 'No location found with this id' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
