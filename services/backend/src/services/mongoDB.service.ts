import mongodb, { MongoClientOptions, ObjectID} from 'mongodb';
import { 
  MONGODB_AUTH_MECHANISM, 
  MONGODB_DATABASE, 
  MONGODB_PASSWORD, 
  MONGODB_URI, 
  MONGODB_USER
} from '@src/config';

import { User } from '@src/generated/graphql';

let db: mongodb.Db;
let client: mongodb.MongoClient;

export const init = async () => {
  if (db && client) return;

  const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (MONGODB_AUTH_MECHANISM !== undefined) {
    options.authMechanism = MONGODB_AUTH_MECHANISM;
    options.auth = { user: MONGODB_USER, password: MONGODB_PASSWORD };
  }

  client = await mongodb.connect(MONGODB_URI, options);
  console.log('Successfully connected to MongoDB server');

  db = client.db(MONGODB_DATABASE);

  db.collection('users').createIndex({ userId: 1 }, { unique: true });
};

export const getMongoDB = () => db;

export const getUserCollection = () => getMongoDB().collection<User>('users');
