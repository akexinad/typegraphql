import bcrypt from "bcryptjs";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@InputType()
class RegisterInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@Resolver()
export class RegisterResolver {
    @Mutation(() => User)
    async register(@Arg("registerInputOptions") registerInput: RegisterInput) {
        // const { firstName, lastName, email, password } = input;

        const hashedPass = await bcrypt.hash(registerInput.password, 12);

        let savedUser: User;

        try {
            savedUser = await getConnection()
                .getRepository(User)
                .create({ ...registerInput, password: hashedPass })
                .save();

            return savedUser;
        } catch (error) {
            console.log(
                "user ========================================================>",
                error
            );
        }
    }
}
