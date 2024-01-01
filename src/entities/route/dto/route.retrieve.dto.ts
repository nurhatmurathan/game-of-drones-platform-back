import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, isString } from "class-validator";

export class RouteRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    length: string;

    @ApiProperty()
    @IsInt()
    bestTime: number;

    @ApiProperty()
    @IsString()
    map: string;
}
