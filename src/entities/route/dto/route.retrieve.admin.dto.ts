import { ApiProperty } from "@nestjs/swagger";
import { MultilingualtextDto } from "../../multilingualtext/dto/multilingualtext.dto";

export class RouteAdminRetrieveDto {
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
