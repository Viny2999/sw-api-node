import { PlanetModel } from '../models/planet.model';
import * as Planet from '../models/planet.model';
import mongoose from 'mongoose';
require('dotenv').config();

const uri = process.env.NODE_ENV === 'dev' ? process.env.URI_MONGO_LOCAL : process.env.URI_MLAB;

export class MongoRepository {
  private readonly planet = this.connect();

  private connect(): mongoose.Model<mongoose.Document, {}> {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    return Planet.default;
  }

  public async count() {
    return await this.planet.countDocuments();
  }

  public async find() {
    return await this.planet.find().sort({ _id: 1 });
  }

  public async findOne(index: number) {
    return await this.planet.findOne({ index: index });
  }

  public async findOneName(name: string) {
    return await this.planet.findOne({ name: name });
  }

  public async insert(newPlanet: PlanetModel) {
    return await this.planet.create(newPlanet);
  }

  public async update(index: number, dataToUpdate: any) {
    return await this.planet.findOneAndUpdate({ index: index }, dataToUpdate);
  }

  public async delete(index: number) {
    return await this.planet.deleteOne({ index: index });
  }
}