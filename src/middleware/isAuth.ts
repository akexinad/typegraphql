import { MyCtx } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyCtx> = async ({ context }, next) => {
    if (context.req.session.userId) {
        throw new Error("Not Authenticated");
    }

    return next();
};
