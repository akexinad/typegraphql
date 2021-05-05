import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";

(async () => {
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver]
        })
    });

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(`go to http://localhost:4000/graphql`);
    });
})();
