import { MISSING_INFORMATION, NOT_FOUND, SERVER_ERROR } from '../../utils/erros.json';
import { PlanetModel } from '../models/planet.model';
import { MongoService } from './mongo.service';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import * as axiosDefault from 'axios';

const mongo = new MongoService();
const Planet = mongo.connect();
const axios = axiosDefault.default;

export class PlanetService {
  public async getAllPlanets(req: Request, res: Response) {
    try {
      let queryRes = await Planet.find()
        .sort({ _id: 1 });
      res.send(queryRes);
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  };

  public async getPlanetById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      let queryRes = await Planet.findOne({ _id: id });
      if (queryRes) {
        let films = await this.requestMovies(queryRes);
        queryRes = Object.assign(queryRes, films);
        res.send(queryRes);
      } else {
        res.status(404).send(NOT_FOUND)
      };
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  };

  public async getPlanetByName(req: Request, res: Response) {
    const name = req.params.name;
    try {
      let queryRes = await Planet.findOne({ name: name });
      if (queryRes) {
        let films = await this.requestMovies(queryRes);
        queryRes = Object.assign(queryRes, films);
        res.send(queryRes);
      } else {
        res.status(404).send(NOT_FOUND)
      };
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  };

  public async postPlanet(req: Request, res: Response) {
    if (req.body.index && req.body.name && req.body.climate && req.body.terrain) {
      const newPlanet = new PlanetModel({
        _id: req.body.index,
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
      await Planet.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(req.body);
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  }

  public async deletePlanet(req: Request, res: Response) {
    try {
      await Planet.deleteOne({ _id: req.params.id });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send(SERVER_ERROR);
      throw new Error(err);
    }
  }

  private async requestMovies(planet: Document) {
    const swapiEndpoint = 'https://swapi.co/api/planets/';
    let filmsArray, films;

    try {
      filmsArray = await axios.get(swapiEndpoint + planet._id).then(res => {
        return res.data;
      });

      films = {
        movies: filmsArray
      };
    } catch (err) {
      throw new Error(err);
    }

    return films;
  }
}
