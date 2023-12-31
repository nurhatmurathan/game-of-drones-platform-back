import { IsString, IsUrl } from "class-validator";
import { MultilingualtextDto } from "../../multilingualtext/dto/multilingualtext.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RouteCreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    description: MultilingualtextDto;

    @ApiProperty()
    length: string;

    @ApiProperty()
    bestTime: number;

    @ApiProperty()
    @IsUrl()
    map: string;
}
