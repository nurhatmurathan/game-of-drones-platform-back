import { UserService } from "./../../entities/user/user.service";
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: "IsEmailAlreadyExist", async: true })
@Injectable()
export class IsEmailAlreadyExist implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(email: string, args: ValidationArguments) {
        return await this.userService.findOneByEmail(email).then((user) => {
            if (user) return false;
            return true;
        });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Email is already in use";
    }
}
