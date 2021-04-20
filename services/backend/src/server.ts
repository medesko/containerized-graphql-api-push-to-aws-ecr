import { ApolloServer } from 'apollo-server';
import { DatabaseService } from "./services/mongo.service";
import { typeDefs } from './schema/schema'
import { Users } from './datasources/users';

class Server {
  databaseService : DatabaseService;
  apolloOptions: Record<string, unknown>;
  server: ApolloServer;

  constructor(
    databaseService: DatabaseService,
    apolloOptions: Record<string, unknown> = {}
  ) {
    this.databaseService = databaseService;
    this.apolloOptions = apolloOptions;
  }

  async start(): Promise<ApolloServer> {

    const dataSources = {
      users: new Users(),
    };

    
    this.server = new ApolloServer({
      typeDefs,
      dataSources: () => dataSources,
      onHealthCheck: async () => 'true',
      ...this.apolloOptions,
    });
    return this.server;
  }

  async stop(): Promise<void> {
    await this.server.stop();
  }
}

export default Server;