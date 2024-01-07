import { ApiProperty } from "@nestjs/swagger";
import { TournamnetCoverDto } from "../../../entities/tournament/dto/tournament.cover.dto";

export class TournamnetTimeCoverDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ example: Date.now() })
    startTime: number;

    @ApiProperty()
    tournament: TournamnetCoverDto;
}
