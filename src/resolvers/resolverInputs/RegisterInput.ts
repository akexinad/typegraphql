import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../decorators/isEmailAlreadyExists";
import { PasswordInput } from "./PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
    @Field()
    @Length(2, 15)
    firstName: string;

    @Field()
    @Length(2, 15)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "This email is already in use" })
    email: string;
}
