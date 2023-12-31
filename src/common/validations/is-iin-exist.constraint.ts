import { UserService } from "./../../entities/user/user.service";
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: "IsIINAlreadyExist", async: true })
@Injectable()
export class IsIINAlreadyExist implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(iin: string, args: ValidationArguments) {
        return await this.userService.findOneByIIN(iin).then((user) => {
            if (user) return false;
            return true;
        });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "IIN is already in use";
    }
}
