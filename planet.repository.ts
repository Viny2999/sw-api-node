import { DeleteConfirmation, Planet, PlanetPagination, MongooseConnector } from '../types';
import { PlanetModel, MongooseModelConnector } from '../models';
import * as paginate from 'express-paginate';
import { Request } from 'express';
import mongoose from 'mongoose';
require('dotenv').config();

const uri = process.env.NODE_ENV === 'dev' ? process.env.URI_MONGO_LOCAL : process.env.URI_MLAB;

export class PlanetRepository {
  private readonly planet = this.connect();

  private connect(): MongooseConnector {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    return MongooseModelConnector;
  }

  public async count() {
    return this.planet.countDocuments();
  }

  public async find(req: Request) : Promise<PlanetPagination> {
    const limit = req.query.limit;
    const currentPage = req.query.page;

    const skip = limit * (currentPage - 1);

    const [results, itemCount] = await Promise.all([
      this.planet
        .find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skip),
      this.count()
    ]);

    const pageCount = Math.ceil(itemCount / limit);

    const response : PlanetPagination = {
      pageCount: pageCount,
      itemCount: itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, currentPage),
      planets: results
    };

    return response;
  }

  public async findOne(index: number): Promise<Planet> {
    return this.planet.findOne({ index: index });
  }

  public async findOneName(name: string): Promise<Planet> {
    return this.planet.findOne({ name: name });
  }

  public async insert(newPlanet: PlanetModel): Promise<Planet> {
    return this.planet.create(newPlanet);
  }

  public async update(index: number, dataToUpdate: any): Promise<Planet> {
    return this.planet.findOneAndUpdate({ index: index }, dataToUpdate);
  }

  public async delete(index: number): Promise<DeleteConfirmation> {
    return this.planet.deleteOne({ index: index });
  }
}