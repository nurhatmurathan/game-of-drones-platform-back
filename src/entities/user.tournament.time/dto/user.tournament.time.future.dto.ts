import { ApiProperty } from "@nestjs/swagger";
import { TournamnetTimeCoverDto } from "../../tournament.time/dto/user/tournament.time.cover.dto";

export class UserFutureTournamnetTimeDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tournamentTime: TournamnetTimeCoverDto;
}
