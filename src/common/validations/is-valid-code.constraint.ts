import { Injectable } from "@nestjs/common";
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { TokenService } from "../../entities/token/token.service";

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
        return "Code is not Active or Expired!";
    }
}
