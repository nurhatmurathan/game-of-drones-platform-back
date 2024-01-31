import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class TournamentTimeRegisterDto {
    @ApiProperty()
    @IsInt()
    tournamentTimeId: number;
}
