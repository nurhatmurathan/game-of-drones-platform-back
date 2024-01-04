import { IsInt, IsString, IsUrl, ValidateNested } from "class-validator";
import { MultilingualtextUpdateDto } from "src/entities/multilingualtext/dto/multilingualtext.update.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RouteUpdateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @ValidateNested()
    description: MultilingualtextUpdateDto;

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
