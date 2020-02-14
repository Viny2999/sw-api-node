import mongoose from 'mongoose';

export type PlanetPagination = {
  pageCount: number;
  itemCount: number;
  pages: any;
  planets: mongoose.Document[];
}