import * as Planet from '../models/planet.model';
import mongoose from 'mongoose';
require('dotenv').config();

const uri = process.env.NODE_ENV === 'dev' ? process.env.URI_MONGO_LOCAL : process.env.URI_MLAB;

export class MongoService {
  public connect(): mongoose.Model<mongoose.Document, {}> {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    return Planet.default;
  }
}