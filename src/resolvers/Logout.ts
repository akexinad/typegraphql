import { MyCtx } from "src/types";
import { Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyCtx): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return ctx.req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                    reject(false);
                }

                ctx.res.clearCookie("qid");

                return resolve(true);
            });
        });
    }
}
