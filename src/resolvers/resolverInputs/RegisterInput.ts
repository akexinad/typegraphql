import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../../entities/User";
import { IsEmailAlreadyExist } from "../decorators/isEmailAlreadyExists";

@InputType()
export class RegisterInput extends User {
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

    @Field()
    password: string;
}
