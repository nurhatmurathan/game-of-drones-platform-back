import { MultilingualtextDto } from '../../multilingualtext/dto/multilingualtext.dto';
import { ApiProperty } from "@nestjs/swagger";

export class RouteCreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: MultilingualtextDto;

    @ApiProperty()
    length: string;

    @ApiProperty()
    bestTime: string;

    @ApiProperty()
    map: string;
}