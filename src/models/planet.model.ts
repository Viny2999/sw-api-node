import * as mongoose from 'mongoose';

export type PlanetModel = {
  _id: String,
  name: String,
  climate: String,
  terrain: String,
  movies: String
}