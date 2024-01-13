import { ApiProperty } from "@nestjs/swagger";
import { TournamentTimeCoverDto } from "../../tournament.time/dto/user/tournament.time.cover.dto";

export class UserFutureTournamnetTimeDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tournamentTime: TournamentTimeCoverDto;
}
