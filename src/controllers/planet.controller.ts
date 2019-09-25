import { PlanetService } from '../services/planet.service';
import { Router } from 'express';

const router = Router();
const planetService = new PlanetService();

router.get('/planets', planetService.getAllPlanets);

router.get('/planets/:index', planetService.getPlanetByIndex);

router.get('/planets/search/:name', planetService.getPlanetByName);

router.post('/planets', planetService.postPlanet);

router.put('/planets/:index', planetService.putPlanet);

router.delete('/planets/:index', planetService.deletePlanet);

export const PlanetController: Router = router;
