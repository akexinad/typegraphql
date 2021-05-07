import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressJwt from "express-jwt";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { HelloResolver } from "./resolvers/HelloResolver";
import { LoginResolver } from "./resolvers/LoginResolver";
import { RegisterResolver } from "./resolvers/RegisterResolver";
import { formatArgumentValidationError } from "./utils/formatArgumentValidationError";
import { JWT_SECRET } from "./utils/keys/jwtSecret";

(async () => {
    dotenv.config();

    const PORT = process.env.PORT;

    if (!PORT) {
        console.error("There is no port.");
        process.exit(1);
    }

    await createConnection().catch((e) => console.log(e));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, RegisterResolver, LoginResolver]
        }),
        context: ({ req, res }) => {
            return { req, res };
        },
        formatError: (error) => formatArgumentValidationError(error)
    });

    const app = express();

    app.use(
        expressJwt({
            secret: JWT_SECRET,
            algorithms: ["HS256"],
            credentialsRequired: false
        })
    );

    app.use(
        cors({
            allowedHeaders: "authorization",
            credentials: true
        })
    );

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(PORT, () => {
        console.log(`go to http://localhost:${PORT}/graphql`);
    });
})();
