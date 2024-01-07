import { TokenService } from "../../entities/token/token.service";
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidCode implements ValidatorConstraintInterface {
    constructor(private readonly tokenService: TokenService) {}

    async validate(code: string, args: ValidationArguments) {
        return await this.tokenService
            .findOneByCode(code)
            .then((tokenInstance) => {
                if (!tokenInstance || tokenInstance.expirationDate > new Date())
                    return false;
                return true;
            });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Code is Invalid or Expired!";
    }
}
