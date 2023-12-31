import { IsString } from "class-validator";
import { MultilingualtextDto } from "../../multilingualtext/dto/multilingualtext.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LigaCreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: MultilingualtextDto;
}
