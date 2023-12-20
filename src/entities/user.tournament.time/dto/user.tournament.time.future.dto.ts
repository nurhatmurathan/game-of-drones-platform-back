import { ApiProperty } from "@nestjs/swagger";
import { TournamnetTimeCoverDto } from "../../../entities/tournament.time/dto/tournament.time.cover.dto";

export class UserFutureTournamnetTimeDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tournamentTime: TournamnetTimeCoverDto;
}
