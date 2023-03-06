import mongoose from 'mongoose';

const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
const dbName = process.env.DATABASE_NAME;

const appName = 'Products API';
const url = `mongodb://${dbHost}:${dbPort}`;

export const getConnection = async () => {
  mongoose.set('strictQuery', false);
  return await mongoose.connect(url, { dbName, appName });
};
