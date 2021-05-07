import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import { User } from "../../entities/User";
import { RegisterInput } from "../resolverInputs/RegisterInput";

@ValidatorConstraint({ async: true })
class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(email: User["email"]) {
        const user = await User.findOne({ where: { email } });

        if (user) {
            return false;
        }

        return true;
    }
}

export const IsEmailAlreadyExist = (validationOptions?: ValidationOptions) => {
    return (object: RegisterInput, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint
        });
    };
};
