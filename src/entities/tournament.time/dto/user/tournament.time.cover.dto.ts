import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { TournamnetCoverDto } from "../../../tournament/dto/user/tournament.cover.dto";

export class TournamentTimeCoverDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty({ example: Date.now() })
    @IsInt()
    startTime: number;

    @ApiProperty()
    tournament: TournamnetCoverDto;
}
