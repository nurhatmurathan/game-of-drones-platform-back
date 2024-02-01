import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class TournamentSelectDto {
    @ApiProperty()
    @IsInt()
    id: number;
}
