import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { MultilingualtextUpdateDto } from "../../../entities/multilingualtext/dto/multilingualtext.update.dto";

export class LigaUpdateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    description: MultilingualtextUpdateDto;
}
