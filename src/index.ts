import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./resolvers/RegisterResolver";
import { HelloResolver } from "./resolvers/HelloResolver";

(async () => {
    await createConnection().catch((e) => console.log(e));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, RegisterResolver]
        })
    });

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(`go to http://localhost:4000/graphql`);
    });
})();
