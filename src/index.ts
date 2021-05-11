import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { redis } from "./redis";
import { ConfirmUserResolver } from "./resolvers/ConfirmUserResolver";
import { HelloResolver } from "./resolvers/HelloResolver";
import { LoginResolver } from "./resolvers/LoginResolver";
import { MeResolver } from "./resolvers/Me";
import { RegisterResolver } from "./resolvers/RegisterResolver";
import { formatArgumentValidationError } from "./utils/formatArgumentValidationError";

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
            resolvers: [
                HelloResolver,
                RegisterResolver,
                LoginResolver,
                MeResolver,
                ConfirmUserResolver
            ],
            authChecker: ({ context }) => {
                return !!context.req.session.userId;
            }
        }),
        context: ({ req, res }) => {
            return { req, res };
        },
        formatError: (error) => formatArgumentValidationError(error)
    });

    const app = express();

    const RedisStore = connectRedis(session);

    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: "qid",
            secret: process.env.SESSION_SECRET as string,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    );

    app.use(
        cors({
            credentials: true,
            origin: process.env.CLIENT_URL
        })
    );

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(PORT, () => {
        console.log(`go to http://localhost:${PORT}/graphql`);
    });
})();
