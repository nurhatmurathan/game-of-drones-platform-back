import { MultilingualtextDto } from "../../multilingualtext/dto/multilingualtext.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, isString } from "class-validator";

export class RouteRetrieveAdminDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: MultilingualtextDto;

    @ApiProperty()
    length: string;

    @ApiProperty()
    bestTime: number;

    @ApiProperty()
    map: string;
}
