const mongoose = require("mongoose");
const uri = require("../config/uri");
require("dotenv").config();

if (process.env.LOCAL == "true") {
  mongoose.connect(uri.local, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
} else {
  mongoose.connect(uri.mlab, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
}

const planetSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  climate: String,
  terrain: String
}, {
    collection: "Planet",
    _id: false,
    versionKey: false
  });

const planet = mongoose.model("Planet", planetSchema);

module.exports = { Mongoose: mongoose, PlanetSchema: planetSchema, Planet: planet }