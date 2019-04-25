const mongoose = require('mongoose');
const uri = require('../config/uri');

mongoose.connect(uri.mlab, { useNewUrlParser: true });
// mongoose.connect(uri.local , { useNewUrlParser: true });

const planetSchema = new mongoose.Schema({
  name: String,
  climate: String,
  terrain: String
}, { collection: 'Planet' });

const planet = mongoose.model('Planet', planetSchema);

module.exports = { Mongoose: mongoose, PlanetSchema: planetSchema, Planet: planet }