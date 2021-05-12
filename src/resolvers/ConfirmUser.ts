import { confirmUserPrefix } from "../constants/redisPrefixes";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { redis } from "../redis";

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(@Arg("token") token: string): Promise<boolean> {
        const userId = await redis.get(confirmUserPrefix + token);

        if (!userId) {
            return false;
        }

        await User.update({ id: +userId }, { confirmed: true });

        await redis.del(token);

        return true;
    }
}
