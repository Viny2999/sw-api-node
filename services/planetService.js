const Planet = require("../utils/DB").Planet;
const ERRO = require("../utils/erros");
const axios = require("axios");

const getAllPlanets = (req, res) => {
  Planet.find().sort({ _id: 1 }).then(response => {
    res.send(response);
  }).catch(err => {
    res.status(500).send(ERRO.SERVER_ERROR);
  });
};

const getPlanetById = (req, res) => {
  Planet.findOne({ _id: req.params.id }).then(async response => {
    if (response) {
      let films = await requestMovies(response);
      let newPlanet = new Object();
      newPlanet._id = response._id;
      newPlanet.name = response.name;
      newPlanet.climate = response.climate;
      newPlanet.terrain = response.terrain;
      newPlanet.movies = films.movies;

      res.send(newPlanet);
    }
    else res.status(404).send(ERRO.NOT_FOUND);
  }).catch(err => {
    res.status(500).send(err);
  })
};

const getPlanetByName = (req, res) => {
  const name = req.params.name;

  Planet.findOne({ name: name }).then(async response => {
    if (response) {
      let films = await requestMovies(response);
      let newPlanet = new Object();
      newPlanet._id = response._id;
      newPlanet.name = response.name;
      newPlanet.climate = response.climate;
      newPlanet.terrain = response.terrain;
      newPlanet.movies = films.movies;

      res.send(newPlanet);
    }
    else res.status(404).send(ERRO.NOT_FOUND);
  }).catch(err => {
    res.status(500).send(ERRO.SERVER_ERROR);
  })
};

const postPlanet = (req, res) => {
  if (
    req.body.index &&
    req.body.name &&
    req.body.climate &&
    req.body.terrain
  ) {
    const newPlanet = new Planet({
      _id: req.body.index,
      name: req.body.name,
      climate: req.body.climate,
      terrain: req.body.terrain
    });

    newPlanet.save().then(response => {
      res.send(newPlanet);
    }).catch(err => {
      res.status(500).send(ERRO.SERVER_ERROR);
    });
  } else {
    res.status(400).send(ERRO.MISSING_INFORMATION);
  }
};

const putPlanet = (req, res) => {
  Planet.findOneAndUpdate({ _id: req.params.id }, req.body).then(response => {
    res.send(req.body);
  }).catch(err => {
    res.status(500).send(ERRO.SERVER_ERROR);
  });
};

const deletePlanet = (req, res) => {
  Planet.deleteOne({ _id: req.params.id }).then(response => {
    res.send({ success: true });
  }).catch(err => {
    res.status(500).send(ERRO.SERVER_ERROR);
  });
};

const requestMovies = async (planet) => {
  const swapiEndpoint = "https://swapi.co/api/planets/";
  let films;

  films = await axios.get(swapiEndpoint + planet._id).then(res => {
    films = {
      movies: res.data.films
    }
    return films
  });
  return films;
}

exports.getAllPlanets = getAllPlanets;
exports.getPlanetById = getPlanetById;
exports.getPlanetByName = getPlanetByName;
exports.postPlanet = postPlanet;
exports.putPlanet = putPlanet;
exports.deletePlanet = deletePlanet;