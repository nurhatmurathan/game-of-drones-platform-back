import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { TokenService } from "../../entities/register.token/register.token.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidToken implements ValidatorConstraintInterface {
    constructor(private readonly tokenService: TokenService) {}

    async validate(token: string, args: ValidationArguments) {
        return await this.tokenService.findOneByToken(token).then((tokenInstance) => {
            if (!tokenInstance || new Date(tokenInstance.expirationDate) < new Date()) return false;
            return true;
        });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Token is Invalid or Expired!";
    }
}
