require("dotenv").config();
import * as mongoose from "mongoose";
const uri = process.env.URI_MLAB || process.env.URI_LOCAL;

export class MongoService {
  public connect(): mongoose.Model<mongoose.Document, {}> {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false
    });

    const planetSchema = new mongoose.Schema({
      _id: String,
      name: String,
      climate: String,
      terrain: String
    }, {
        collection: "Planet",
        _id: false,
        versionKey: false
      });

    return mongoose.model("Planet", planetSchema);
  }
}