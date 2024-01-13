import { Injectable } from "@nestjs/common";
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { DronService } from "./../../entities/dron/dron.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDronAlreadyExist implements ValidatorConstraintInterface {
    constructor(private readonly dronService: DronService) {}

    async validate(id: string, args: ValidationArguments) {
        return await this.dronService.findOne(id).then((dron) => {
            if (dron) return false;
            return true;
        });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `Dron ${validationArguments.value} is already exist!`;
    }
}
