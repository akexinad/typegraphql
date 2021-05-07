import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MyCtx } from "src/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { JWT_SECRET } from "../utils/keys/jwtSecret";
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

        const token = jwt.sign(
            {
                ...user
            },
            JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: "4h"
            }
        );

        ctx.res.setHeader("authorization", `Bearer ${token}`);

        return token;
    }
}
