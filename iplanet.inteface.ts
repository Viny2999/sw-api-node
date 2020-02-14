import { Document } from 'mongoose';

export interface IPlanet extends Document {
  _id: string;
  name: string;
  climate: string;
  terrain: string;
  movies: string;
}
