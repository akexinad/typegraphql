import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { HelloResolver } from "./resolvers/HelloResolver";
import { RegisterResolver } from "./resolvers/RegisterResolver";
import { formatArgumentValidationError } from "./utils/formatArgumentValidationError";

(async () => {
    await createConnection().catch((e) => console.log(e));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, RegisterResolver]
        }),
        formatError: (error) => formatArgumentValidationError(error)
    });

    const app = express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(`go to http://localhost:4000/graphql`);
    });
})();
