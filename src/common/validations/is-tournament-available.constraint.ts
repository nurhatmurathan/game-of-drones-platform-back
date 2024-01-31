import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { TournamentTime } from "./../../entities/tournament.time/tournament.time.entity";
import { TournamentService } from "./../../entities/tournament/tournament.service";

@ValidatorConstraint({ name: "IsTournamentNotAvailable", async: true })
@Injectable()
export class IsTournamentNotAvailable implements ValidatorConstraintInterface {
    constructor(private readonly tournamentService: TournamentService) {}

    async validate(tournamentId: number, args: ValidationArguments) {
        return await this.tournamentService
            .findOneById(tournamentId, { tournamentTimes: true })
            .then((tournament) => {
                let firstTournamentTime: TournamentTime = tournament.tournamentTimes[0];
                for (const tournamentTime of tournament.tournamentTimes) {
                    if (tournamentTime.startTime < firstTournamentTime.startTime) {
                        firstTournamentTime = tournamentTime;
                    }
                }

                return Date.now() < firstTournamentTime.startTime;
            });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `Registration for this tournamnt is closed`;
    }
}
