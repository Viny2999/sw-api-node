const Planet = require('../utils/mongoose').Planet;

exports.getAllPlanets = (req, res) => {
  Planet.find().then(response => {
    res.send(response);
  }).catch(err => {
    res.status(500).send({ error: err.message });
  });
};

exports.getOnePlanetId = (req, res) => {
  Planet.find({ _id: req.params.id }).then(response => {
    res.send(response);
  }).catch(err => {
    res.status(500).send({ error: err.message });
  })
};

exports.getOnePlanetQueryString = (req, res) => {
  const name = req.query.name;

  Planet.find({ name: name }).then(response => {
    res.send(response);
  }).catch(err => {
    res.status(500).send({ error: err.message });
  })
};

exports.postPlanet = (req, res) => {
  if (
    (req.body.name,
      req.body.climate,
      req.body.terrain)
  ) {
    const newPlanet = new Planet({
      name: req.body.name,
      climate: req.body.climate,
      terrain: req.body.terrain
    });

    newPlanet.save().then(response => {
      res.send(newPlacar);
    }).catch(err => {
      res.status(500).send({ error: err.message });
    });
  }
};

exports.putPlanet = (req, res) => {
  Planet.findOneAndUpdate({ _id: req.params.id }, req.body).then(response => {
    res.send(req.body);
  }).catch(err => {
    res.status(500).send({ error: err.message });
  });
};

exports.deletePlanet = (req, res) => {

  Planet.deleteOne({ _id: req.params.id }).then(response => {
    res.send({ success: true });
  }).catch(err => {
    res.status(500).send({ error: err.message });
  });
};