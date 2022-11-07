const router = require('express').Router();
const { Traveller, Location, Trips } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tripsData = await Trips.findAll({
      include: [{ model: Traveller }, { model: Location }]
    });
    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tripsData = await Trips.findByPk(req.params.id, {
      include: [{ model: Traveller }, { model: Location }]
    });

    if (!tripsData) {
      res.status(404).json({ message: 'No trips found with that id!' });
      return;
    }

    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tripsData = await Trips.create(req.body);
    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try { 
    const tripsData = await Trips.update(req.body, {
      where: {
        id: req.params.id,
      },
      // individualHooks: true
    });
    
    if (!tripsData[0]) {
      res.status(404).json({ message: 'No trips found with that id!' });
      return;
    }
    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tripsData = await Trips.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tripsData) {
      res.status(404).json({ message: 'No trips found with that id!' });
      return;
    }

    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
