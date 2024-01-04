import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, isString } from "class-validator";

export class RouteListDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
