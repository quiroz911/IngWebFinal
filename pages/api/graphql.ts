import 'reflect-metadata';
import 'ts-tiny-invariant';
import { ApolloServer } from "apollo-server-micro";
import Cors from 'micro-cors';

const cors = Cors({
  allowMethods: ["POST", "OPTIONS", "GET", "HEAD"],
});

const functionHandler = async (req, res) => {
  const apolloServer = new ApolloServer({
    typeDefs: [],
    resolvers: [],
  });
  const startServer = apolloServer.start();
  await startServer;
  return apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);

  export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  return functionHandler(req, res);
});