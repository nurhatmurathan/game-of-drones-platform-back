import { UserService } from "./../../entities/user/user.service";
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint
    implements ValidatorConstraintInterface
{
    constructor(private readonly userService: UserService) {}

    async validate(email: string, args: ValidationArguments) {
        console.log(email);
        return false;
        // return await this.userService.findOneByEmail(email).then((user) => {
        //     if (user) return false;
        //     return true;
        // });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Email is already in use";
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}
