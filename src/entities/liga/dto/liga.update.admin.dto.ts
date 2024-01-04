import { IsString } from "class-validator";
import { MultilingualtextUpdateDto } from "src/entities/multilingualtext/dto/multilingualtext.update.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LigaUpdateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    description: MultilingualtextUpdateDto;
}
