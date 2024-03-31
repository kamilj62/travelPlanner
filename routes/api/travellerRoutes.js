const router = require('express').Router();
const { Traveller, Trip } = require('../../models');

// READ all travellers
// endpoint '/api/travellers'

// GET all travellers
router.get('/', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll();
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const traveller = await Traveller.findByPk(req.params.id, {
      include: [{ model: Location, through: Trip }]
    });
    if (!traveller) {
      return res.status(404).json({ msg: 'traveller not found' });
    }
    res.status(200).json(traveller);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Traveller.destroy({
      where: { id: req.params.id }
    });
    if (!result) {
      return res.status(404).json({ msg: 'traveller not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTraveller = await Traveller.create(req.body);
    res.status(200).json(newTraveller);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
