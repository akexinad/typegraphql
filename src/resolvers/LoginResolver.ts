import bcrypt from "bcryptjs";
import { MyCtx } from "src/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { LoginInput } from "./resolverInputs/LoginInput";

@Resolver()
export class LoginResolver {
    @Mutation(() => String, { nullable: true })
    async login(
        @Arg("loginInputOptions") input: LoginInput,
        @Ctx() ctx: MyCtx
    ) {
        const { email, password } = input;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return null;
        }
    }
}
