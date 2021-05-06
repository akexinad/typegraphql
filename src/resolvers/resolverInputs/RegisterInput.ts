import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field()
    @Length(2, 15)
    firstName: string;

    @Field()
    @Length(2, 15)
    lastName: string;

    @Field()
    @IsEmail({}, { message: "this is a shit email" })
    email: string;

    @Field()
    password: string;
}
