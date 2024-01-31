import { ApiProperty } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { IsTournamentNotAvailable } from "./../../../common/validations/is-tournament-available.constraint";

export class UserTournamnetTimeRegisterDto {
    @ApiProperty()
    @Validate(IsTournamentNotAvailable)
    tournamentId: number;
}
