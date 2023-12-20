import { MultilingualtextDto } from "../../multilingualtext/dto/multilingualtext.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LigaCreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: MultilingualtextDto;
}
