import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class TournamentTimeAdminListDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty({ example: Date.now() })
    @IsInt()
    startTime: number;

    @ApiProperty()
    @IsInt()
    places: number;

    @ApiProperty()
    @IsInt()
    reserved: number;
}
