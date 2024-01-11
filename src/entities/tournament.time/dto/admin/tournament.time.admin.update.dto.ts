import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";
import { Tournament } from "../../../tournament/tournament.entity";

export class TournamentTimeAdminUpdateDto {
    @ApiProperty()
    @IsOptional()
    @IsInt()
    id: number;

    @ApiProperty({ example: Date.now() })
    @IsInt()
    startTime: number;

    @ApiProperty()
    @IsInt()
    places: number;

    @ApiHideProperty()
    tournament: Tournament;
}
