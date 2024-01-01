import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class TournamnetCreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    startDate: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    ligaId: number;

    @ApiProperty()
    routeId: number;
}
