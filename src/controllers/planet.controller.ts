import { PlanetService } from '../services/planet.service';
import { Router } from 'express';

const router = Router();

router.get('/planets', PlanetService.prototype.getAllPlanets);

router.get('/planets/:id', PlanetService.prototype.getPlanetById);

router.get('/planets/search/:name', PlanetService.prototype.getPlanetByName);

router.post('/planets', PlanetService.prototype.postPlanet);

router.put('/planets/:id', PlanetService.prototype.putPlanet);

router.delete('/planets/:id', PlanetService.prototype.deletePlanet);

export const PlanetController: Router = router;
