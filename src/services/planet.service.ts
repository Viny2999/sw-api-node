import { MISSING_INFORMATION, NOT_FOUND, SERVER_ERROR } from '../../utils/erros.json';
import { PlanetModel } from '../models/planet.model';
import { MongoService, UtilService } from '.';
import { Request, Response } from 'express';

const mongoService = new MongoService();
const Planet = mongoService.connect();

export class PlanetService {
  public async getAllPlanets(req: Request, res: Response) {
    try {
      const queryRes = await Planet.find()
        .sort({ _id: 1 });
      res.send(queryRes);
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  };

  public async getPlanetById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const queryRes = await Planet.findOne({ index: id });
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
        res.send(planetInfo);
      } else {
        res.status(404).send(NOT_FOUND)
      };
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  };

  public async getPlanetByName(req: Request, res: Response) {
    try {
      const name = req.params.name;
      let queryRes = await Planet.findOne({ name: name });
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
        res.send(planetInfo);
      } else {
        res.status(404).send(NOT_FOUND)
      };
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  };

  public async postPlanet(req: Request, res: Response) {
    if (req.body.name && req.body.climate && req.body.terrain) {
      const planetCount = await Planet.countDocuments();

      const newPlanet = new PlanetModel({
        index: Number(req.body.index) || planetCount + 1,
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain
      });

      try {
        await Planet.create(newPlanet);
        res.send(newPlanet);
      } catch (err) {
        res.status(500).send(SERVER_ERROR);
        throw new Error(err);
      }
    } else {
      res.status(400).send(MISSING_INFORMATION);
    }
  };

  public async putPlanet(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      await Planet.findOneAndUpdate({ index: id }, req.body);
      res.send(req.body);
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  }

  public async deletePlanet(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      await Planet.deleteOne({ index: id });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  }
}
