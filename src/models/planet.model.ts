import { Entity, model, property } from '@loopback/repository';
import mongoose, { Schema, Document } from 'mongoose';

export interface IPlanet extends Document {
  _id: String,
  name: String,
  climate: String,
  terrain: String,
  movies: String
}

@model()
export class PlanetModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: String;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string'
  })
  climate: string;

  @property({
    type: 'string'
  })
  terrain: string;

  constructor(data?: Partial<PlanetModel>) {
    super(data);
  }
}

const PlanetSchema = new Schema({
  _id: String,
  name: String,
  climate: String,
  terrain: String
}, {
  collection: 'Planet',
  _id: false,
  versionKey: false
});

export default mongoose.model<IPlanet>('Planet', PlanetSchema);