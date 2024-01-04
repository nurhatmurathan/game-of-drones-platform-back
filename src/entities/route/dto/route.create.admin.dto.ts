import { IsInt, IsString, IsUrl, ValidateNested } from "class-validator";
import { MultilingualtextDto } from "../../multilingualtext/dto/multilingualtext.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RouteCreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @ValidateNested()
    description: MultilingualtextDto;

    @ApiProperty()
    @IsString()
    length: string;

    @ApiProperty()
    @IsInt()
    bestTime: number;

    @ApiProperty()
    @IsUrl()
    map: string;
}
