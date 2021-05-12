import bcrypt from "bcryptjs";
import { MyCtx } from "src/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { User } from "../entities/User";
import { redis } from "../redis";
import { ChangePasswordInput } from "./resolverInputs/ChangePasswordInput";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") data: ChangePasswordInput,
        @Ctx() ctx: MyCtx
    ): Promise<User | null> {
        const userId = await redis.get(forgotPasswordPrefix + data.token);

        if (!userId) {
            return null;
        }

        const user = await User.findOne(userId);

        if (!user) {
            return null;
        }

        await redis.del(forgotPasswordPrefix + data.token);

        user.password = await bcrypt.hash(data.password, 12);

        await user.save();

        ctx.req.session.userId = user.id;

        return user;
    }
}
