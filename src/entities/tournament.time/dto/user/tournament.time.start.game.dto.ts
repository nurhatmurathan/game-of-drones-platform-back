import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class TournamentStartGameDto {
    @ApiProperty()
    @IsInt()
    id: number;
}
