import { Db, MongoClient, MongoClientOptions } from "mongodb";
import { 
  MONGODB_AUTH_MECHANISM, 
  MONGODB_DATABASE, 
  MONGODB_PASSWORD, 
  MONGODB_URI, 
  MONGODB_USER
} from '@src/config';

abstract class DatabaseService {
  db: Db;
  client: MongoClient;

  abstract start(): Promise<Db | null>;

  async connect(uri: string, name: string): Promise<Db | null> {

    const options: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    if (MONGODB_AUTH_MECHANISM !== undefined) {
      options.authMechanism = MONGODB_AUTH_MECHANISM;
      options.auth = { user: MONGODB_USER, password: MONGODB_PASSWORD };
    }

    this.client = new MongoClient(uri, options);

    try {
      await this.client.connect();
      this.db = this.client.db(name);
      this.db.collection('users').createIndex({ email: 1 }, { unique: true });
      return this.db;
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  async stop(): Promise<void> {
    await this.client.close();
  }

  async drop(): Promise<void> {
    this.db.dropDatabase();
  }
}

class MongoDBService extends DatabaseService {
  readonly uri: string = `${MONGODB_URI}`;

  async start(): Promise<Db | null> {
    return super.connect(this.uri, MONGODB_DATABASE);
  }
}

export { DatabaseService, MongoDBService };
