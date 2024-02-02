import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt } from "class-validator";

export class TournamentTimeListDto {
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

    @ApiProperty()
    @IsBoolean()
    isSelected: boolean;
}

export class TournamentTimeListDtoV2 {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty({ example: Date.now() })
    @IsInt()
    startTime: number;

    @ApiProperty({ example: 2 })
    @IsInt()
    stage: number;

    @ApiProperty({ example: 7 })
    @IsInt()
    place: number;
}
