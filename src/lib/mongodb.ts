import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Skip MongoDB connection during build time
if (process.env.NEXT_PHASE === 'phase-production-build') {
  clientPromise = Promise.resolve({} as MongoClient);
} else if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
} else if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
