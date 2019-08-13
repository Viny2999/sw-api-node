const express = require("express");
const router = express.Router();
const planetService = require("../services/planetService");

router.get("/planets", planetService.getAllPlanets);

router.get("/planets/:id", planetService.getPlanetById);

router.get("/planets/search/:name", planetService.getPlanetByName);

router.post("/planets", planetService.postPlanet);

router.put("/planets/:id", planetService.putPlanet);

router.delete("/planets/:id", planetService.deletePlanet);

module.exports = router;
