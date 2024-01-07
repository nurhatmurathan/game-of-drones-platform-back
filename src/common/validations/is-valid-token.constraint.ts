import { TokenService } from "../../entities/token/token.service";
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidToken implements ValidatorConstraintInterface {
    constructor(private readonly tokenService: TokenService) {}

    async validate(token: string, args: ValidationArguments) {
        return await this.tokenService
            .findOneByToken(token)
            .then((tokenInstance) => {
                if (!tokenInstance || tokenInstance.expirationDate > new Date())
                    return false;
                return true;
            });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Token is Invalid or Expired!";
    }
}
