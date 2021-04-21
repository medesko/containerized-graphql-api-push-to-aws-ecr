import { MongoDBService } from "./services/mongo.service";
import { PORT } from './config'
import Server from "./server";


const start = async () => {

  const server = new Server(new MongoDBService(), {
    introspection: !(process.env.NODE_ENV === "production"),
    playground: !(process.env.NODE_ENV === "production"),
  });

  try {

    const appServer = await server.start()
    const { url } = await appServer.listen({ port: PORT })
    console.log(`🚀 Apollo server is ready at ${url}`);

  } catch (error) {
    console.log(error)
    throw error;
  }

}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
