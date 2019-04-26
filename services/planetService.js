const Planet = require('../utils/mongoose').Planet;
const ERRO = require("../utils/erros");

const getAllPlanets = (req, res) => {
  Planet.find().sort({ _id: 1 }).then(response => {
    res.send(response);
  }).catch(err => {
    res.status(500).send(ERRO.SERVER_ERROR);
  });
};

const getOnePlanetId = (req, res) => {
  Planet.find({ _id: req.params.id }).then(response => {
    if (response.length < 1) res.status(404).send(ERRO.NOT_FOUND);
    else res.send(response);
  }).catch(err => {
    res.status(500).send(ERRO.SERVER_ERROR);
  })
};

const getOnePlanetString = (req, res) => {
  const name = req.params.name;

  Planet.find({ name: name }).then(response => {
    if (response.length < 1) res.status(404).send(ERRO.NOT_FOUND);
    else res.send(response);
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

exports.getAllPlanets = getAllPlanets;
exports.getOnePlanetId = getOnePlanetId;
exports.getOnePlanetString = getOnePlanetString;
exports.postPlanet = postPlanet;
exports.putPlanet = putPlanet;
exports.deletePlanet = deletePlanet;