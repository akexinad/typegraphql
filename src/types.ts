import { ExpressContext } from "apollo-server-express";

export type MyCtx = ExpressContext & {
    req: {
        session: {
            userId: number;
        };
    };
};
