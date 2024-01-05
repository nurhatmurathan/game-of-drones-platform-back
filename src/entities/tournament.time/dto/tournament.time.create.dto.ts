import { Tournament } from "./../../tournament/tournament.entity";
import { ApiProperty } from "@nestjs/swagger";

export class TournamnetTimeCreateDto {
    @ApiProperty()
    startTime: number;

    @ApiProperty()
    places: number;

    @ApiProperty({ type: Number })
    tournament: Tournament;
}
