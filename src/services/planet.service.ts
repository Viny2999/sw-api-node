import { MISSING_INFORMATION, NOT_FOUND, SERVER_ERROR, SERVER_ERROR_REQUEST } from '../../utils/erros.json';
import { PlanetModel } from '../models/planet.model';
import { MongoRepository } from '../repositories';
import { LoggerService, UtilService } from '.';
import { Request, Response } from 'express';

const mongoRepository = new MongoRepository();
const logger = LoggerService.getLogger();

export class PlanetService {
  public async getAllPlanets(req: Request, res: Response) {
    try {
      const queryRes = await mongoRepository.find();
      logger.debug('PlanetService :: getAllPlanets :: All planets retrivied');
      res.send(queryRes);
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  };

  public async getPlanetByIndex(req: Request, res: Response) {
    try {
      const index = Number(req.params.index)
      const queryRes = await mongoRepository.findOne(index);
      if (queryRes) {
        const films = await UtilService.prototype.requestMovies(queryRes.get('index'));
        const planetInfo = {
          _id: queryRes.get('_id'),
          index: queryRes.get('index'),
          name: queryRes.get('name'),
          climate: queryRes.get('climate'),
          terrain: queryRes.get('terrain'),
          ...films
        }
        logger.debug('PlanetService :: getPlanetById :: Planet retrivied');
        res.send(planetInfo);
      } else {
        res.status(404).send(NOT_FOUND)
      };
    } catch (err) {
      res.status(500).send(SERVER_ERROR_REQUEST);
      throw new Error(err);
    }
  };

  public async getPlanetByName(req: Request, res: Response) {
    try {
      const name = req.params.name;
      let queryRes = await mongoRepository.findOneName(name);
      if (queryRes) {
        const films = await UtilService.prototype.requestMovies(queryRes.get('index'));
        const planetInfo = {
          _id: queryRes.get('_id'),
          index: queryRes.get('index'),
          name: queryRes.get('name'),
          climate: queryRes.get('climate'),
          terrain: queryRes.get('terrain'),
          ...films
        }
        logger.debug('PlanetService :: getPlanetByName :: Planet retrivied');
        res.send(planetInfo);
      } else {
        res.status(404).send(NOT_FOUND)
      };
    } catch (err) {
      res.status(500).send(SERVER_ERROR_REQUEST);
      throw new Error(err);
    }
  };

  public async postPlanet(req: Request, res: Response) {
    if (req.body.name && req.body.climate && req.body.terrain) {
      const planetCount = await mongoRepository.count();

      const newPlanet = new PlanetModel({
        index: Number(req.body.index) || planetCount + 1,
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain
      });

      try {
        await mongoRepository.insert(newPlanet);
        logger.debug('PlanetService :: postPlanet :: Planet created : ', JSON.stringify(newPlanet, null, 2));
        res.status(201).send(newPlanet);
      } catch (err) {
        res.status(500).send(SERVER_ERROR);
        throw new Error(err);
      }
    } else {
      res.status(400).send(MISSING_INFORMATION);
    }
  };

  public async putPlanet(req: Request, res: Response) {
    if (req.body.name || req.body.climate || req.body.terrain) {
      try {
        const index = Number(req.params.index)
        const dataToUpdate = req.body;
        await mongoRepository.update(index, dataToUpdate);
        logger.debug('PlanetService :: putPlanet :: Data updated : ', JSON.stringify(dataToUpdate, null, 2));
        res.send(dataToUpdate);
      } catch (err) {
        res.status(500).send(SERVER_ERROR);
        throw new Error(err);
      }
    } else {
      res.status(400).send(MISSING_INFORMATION);
    }
  }

  public async deletePlanet(req: Request, res: Response) {
    try {
      const index = Number(req.params.index)
      await mongoRepository.delete(index);
      logger.debug('PlanetService :: deletePlanet :: Planet deleted');
      res.status(200).send();
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  }
}
