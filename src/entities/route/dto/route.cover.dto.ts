import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, isString } from "class-validator";

export class RouteCoverDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
