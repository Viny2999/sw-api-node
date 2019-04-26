const express = require('express');
const router = express.Router();
const planetService = require('../services/planetService');

router.get('/planets', planetService.getAllPlanets);

router.get('/planets/:id', planetService.getOnePlanetId);

router.get('/planets/search/:name', planetService.getOnePlanetString);

router.post('/planets', planetService.postPlanet);

router.put('/planets/:id', planetService.putPlanet);

router.delete('/planets/:id', planetService.deletePlanet);

module.exports = router;
