import { Injectable } from "@nestjs/common";
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { DroneService } from "../../entities/dron/drone.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDronAlreadyExist implements ValidatorConstraintInterface {
    constructor(private readonly dronService: DroneService) { }

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
