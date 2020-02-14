import mongoose, { Schema } from 'mongoose';
import { IPlanet } from '.';

export const PlanetSchema = new Schema(
  {
    index: Number,
    name: String,
    climate: String,
    terrain: String
  },
  {
    collection: 'Planet',
    versionKey: false
  }
);

export const MongooseModelConnector = mongoose.model<IPlanet>('Planet', PlanetSchema);
