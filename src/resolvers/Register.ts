import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
import { sendEmail } from "../utils/sendEmail";
import { RegisterInput } from "./resolverInputs/RegisterInput";

@Resolver(User)
export class RegisterResolver {
    /**
     * We are now doing this directly on the class.
     *
     * It is recommended that if the resolver is simple it's
     * best to do it within the class.
     */
    // @FieldResolver()
    // name(@Root() parent: User) {
    //     return `${parent.firstName} ${parent.lastName}`;
    // }

    @Query(() => [User])
    async users() {
        return await getConnection().getRepository(User).find();
    }

    @Mutation(() => User)
    async register(@Arg("registerInputOptions") input: RegisterInput) {
        const hashedPass = await bcrypt.hash(input.password, 12);

        try {
            const savedUser = await getConnection()
                .getRepository(User)
                .create({ ...input, password: hashedPass })
                .save();

            await sendEmail(
                savedUser.email,
                await createConfirmationUrl(savedUser.id.toString())
            );

            return savedUser;
        } catch (error) {
            console.error(error);

            return;
        }
    }
}
