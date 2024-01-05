import { UserTournamentTimeService } from "../../entities/user.tournament.time/user.tournament.time.service";
import { Injectable } from "@nestjs/common";
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsTournamentTimeAlreadyChoosen
    implements ValidatorConstraintInterface
{
    constructor(
        private readonly userTournamentTimeServise: UserTournamentTimeService
    ) {}

    async validate(tournamentTimeId: number, args: ValidationArguments) {
        return await this.userTournamentTimeServise
            .getInstanceByUserIdtournamentTimeId(1, tournamentTimeId)
            .then((instance) => {
                if (instance) return false;
                return true;
            });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "";
    }
}
