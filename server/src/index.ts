import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterUser } from "./modules/user/Register";
import { LoginUser } from "./modules/user/login";

const server = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterUser, LoginUser]
  });

  //3
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  //1
  const app = Express();

  //4
  apolloServer.applyMiddleware({ app });

  //2
  app.listen(4002, () => {
    console.log("PIZZA server started on localhost:4002/graphql");
  });
};

server();
