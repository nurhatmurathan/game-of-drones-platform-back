import { ApiProperty } from "@nestjs/swagger";

export class TournamentTimeListDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ example: Date.now() })
    startTime: number;

    @ApiProperty()
    places: number;

    @ApiProperty()
    reserved: number;
}
