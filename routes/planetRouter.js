const express = require('express');
const router = express.Router();
const planetService = require('../services/planetService');

router.get('/api/planets/all', planetService.getAllPlanets);

router.get('/api/planets/:id', planetService.getOnePlanetId);

router.get('/api/planets', planetService.getOnePlanetQueryString);

router.post('/api/planets', planetService.postPlanet);

router.put('/api/planets/:id', planetService.putPlanet);

router.delete('/api/planets/:id', planetService.deletePlanet);

module.exports = router;
