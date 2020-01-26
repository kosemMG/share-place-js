const express = require('express');

const router = express.Router();

const storage = {
  locations: []
};

router.post('/add-location', (req, res, next) => {
  const id = Math.random();
  storage.locations.push({
    id: id,
    address: req.body.address,
    coordinates: { lat: req.body.lat, lng: req.body.lng }
  });
  res.json({ locationId: id, message: 'Location was stored!' });
});

router.get('/location/:id', (req, res, next) => {
  const locationId = +req.params.id;
  const location = storage.locations.find(location => location.id === locationId);
  console.log(locationId, location);
  if (!location) {
    return res.status(404).json({ message: 'Not found!' });
  }
  res.json({ address: location.address, coordinates: location.coordinates });
});

module.exports = router;
