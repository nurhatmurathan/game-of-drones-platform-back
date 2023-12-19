import { ApiProperty } from "@nestjs/swagger";
import { TournamnetCoverDto } from "src/entities/tournament/dto/tournament.cover.dto";

export class TournamnetTimeCoverDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    startTime: Date;
    @ApiProperty()
    tournament: TournamnetCoverDto;
}
