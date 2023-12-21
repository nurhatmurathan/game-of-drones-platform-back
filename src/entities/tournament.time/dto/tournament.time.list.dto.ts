import { ApiProperty } from "@nestjs/swagger";

export class TournamentTimeListDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    startTime: Date;

    @ApiProperty()
    places: number;

    @ApiProperty()
    reserved: number;
}
