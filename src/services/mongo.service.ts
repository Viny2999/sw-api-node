require('dotenv').config();
import mongoose from 'mongoose';
import * as Planet from '../models/planet.model';
const uri = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/sw-api' : process.env.URI_MLAB;

export class MongoService {
  public connect(): mongoose.Model<mongoose.Document, {}> {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false
    });

    return Planet.default;
  }
}