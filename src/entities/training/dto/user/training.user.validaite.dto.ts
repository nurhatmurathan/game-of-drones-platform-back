import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class TrainingGameDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    tournamentId: number;
}
