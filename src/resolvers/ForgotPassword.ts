import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { User } from "../entities/User";
import { redis } from "../redis";
import { sendEmail } from "../utils/sendEmail";

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {
        console.log(`email`, email);

        const user = await User.findOne({ where: { email } });

        if (!user) {
            /**
             * We will continue returning true as we don't want the user
             * to know if the email exists in the db in the case the user
             * is phishing for emails.
             */
            return true;
        }

        const token = v4();

        await redis.set(
            forgotPasswordPrefix + token,
            user.id,
            "ex",
            60 * 60 * 24
        );

        await sendEmail(
            email,
            `http://localhost:3000/user/change-password/${token}`
        );

        return true;
    }
}
