import { ApiProperty } from "@nestjs/swagger";

export class TournamentTimeListDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    startTime: number;

    @ApiProperty()
    places: number;

    @ApiProperty()
    reserved: number;
}
