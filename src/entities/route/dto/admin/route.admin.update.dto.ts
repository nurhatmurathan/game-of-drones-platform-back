import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString, IsUrl, ValidateNested } from "class-validator";
import { MultilingualtextUpdateDto } from "src/entities/multilingualtext/dto/multilingualtext.update.dto";

export class RouteAdminUpdateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextUpdateDto)
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
