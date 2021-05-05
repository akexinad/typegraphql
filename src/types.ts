import { ExpressContext } from "apollo-server-express";

export type MyCtx = ExpressContext & {
    foo: "bar";
};
