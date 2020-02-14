import mongoose from 'mongoose';

export type MongooseConnector = mongoose.Model<mongoose.Document, {}>;