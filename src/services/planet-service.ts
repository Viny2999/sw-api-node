import { MongoService } from "./mongo-service";
import { PlanetModel } from "../models/planet.model";
import * as axiosDefault from "axios";
import * as ERRO from "../../utils/erros.json";
const mongo = new MongoService();
const Planet = mongo.connect();
const axios = axiosDefault.default;

export class PlanetService {
  public async getAllPlanets(req, res) {
    try {
      let queryRes = await Planet.find()
        .sort({ _id: 1 });
      res.send(queryRes);
    } catch (err) {
      res.status(500).send(ERRO.SERVER_ERROR);
    }
  };

  public async getPlanetById(req, res) {
    try {
      let queryRes = await Planet.findOne({ _id: req.params.id });
      if (queryRes) {
        let films = await requestMovies(queryRes);
        queryRes = Object.assign(queryRes, films);
        res.send(queryRes);
      } else {
        res.status(404).send(ERRO.NOT_FOUND)
      };
    } catch (err) {
      res.status(500).send(ERRO.SERVER_ERROR);
    }
  };

  public async getPlanetByName(req, res) {
    const name = req.params.name;
    try {
      let queryRes = await Planet.findOne({ name: name });
      if (queryRes) {
        let films = await requestMovies(queryRes);
        queryRes = Object.assign(queryRes, films);
        res.send(queryRes);
      } else {
        res.status(404).send(ERRO.NOT_FOUND)
      };
    } catch (err) {
      res.status(500).send(ERRO.SERVER_ERROR);
    }
  };

  public postPlanet(req, res) {
    if (req.body.index && req.body.name && req.body.climate && req.body.terrain) {
      const newPlanet = new Planet({

      });

      let newPlanet: PlanetModel;
      newPlanet._id = req.body.index;
      newPlanet.name = req.body.name;
      newPlanet.climate = req.body.climate;
      newPlanet.terrain = req.body.terrain;

      newPlanet
        .save()
        .then(response => {
          res.send(newPlanet);
        })
        .catch(err => {
          res.status(500).send(ERRO.SERVER_ERROR);
        });
    } else {
      res.status(400).send(ERRO.MISSING_INFORMATION);
    }
  };
}

const postPlanet = (req, res) => {
  if (req.body.index && req.body.name && req.body.climate && req.body.terrain) {
    const newPlanet = new Planet({
      _id: req.body.index,
      name: req.body.name,
      climate: req.body.climate,
      terrain: req.body.terrain
    });

    newPlanet
      .save()
      .then(response => {
        res.send(newPlanet);
      })
      .catch(err => {
        res.status(500).send(ERRO.SERVER_ERROR);
      });
  } else {
    res.status(400).send(ERRO.MISSING_INFORMATION);
  }
};

const putPlanet = (req, res) => {
  Planet.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(response => {
      res.send(req.body);
    })
    .catch(err => {
      res.status(500).send(ERRO.SERVER_ERROR);
    });
};

const deletePlanet = (req, res) => {
  Planet.deleteOne({ _id: req.params.id })
    .then(response => {
      res.send({ success: true });
    })
    .catch(err => {
      res.status(500).send(ERRO.SERVER_ERROR);
    });
};

const requestMovies = async planet => {
  const swapiEndpoint = 'https://swapi.co/api/planets/';
  let films;

  films = await axios.get(swapiEndpoint + planet._id).then(res => {
    films = {
      movies: res.data.films
    };
    return films;
  });
  return films;
};

exports.getAllPlanets = getAllPlanets;
exports.getPlanetById = getPlanetById;
exports.getPlanetByName = getPlanetByName;
exports.postPlanet = postPlanet;
exports.putPlanet = putPlanet;
exports.deletePlanet = deletePlanet;
