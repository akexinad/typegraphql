import { User } from "../entities/User";
import { MyCtx } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver(User)
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyCtx) {
        const userId = ctx.req.session.userId;

        if (!userId) {
            return null;
        }

        const loggedInUser = await User.findOne(ctx.req.session.userId);

        return loggedInUser;
    }
}
