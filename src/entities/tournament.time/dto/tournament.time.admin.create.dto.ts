import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Tournament } from "../../tournament/tournament.entity";

export class TournamentTimeAdminCreateDto {
    @ApiProperty({ example: Date.now() })
    @IsInt()
    startTime: number;

    @ApiProperty()
    @IsInt()
    places: number;

    @ApiHideProperty()
    tournament: Tournament;
}
