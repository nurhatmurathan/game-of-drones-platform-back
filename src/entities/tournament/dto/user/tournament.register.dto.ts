import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Validate } from "class-validator";
import { IsTournamentNotAvailable } from "../../../../common/validations/is-tournament-available.constraint";

export class TournamentRegisterDto {
    @ApiProperty()
    @Validate(IsTournamentNotAvailable)
    @IsInt()
    tournamentId: number;
}
