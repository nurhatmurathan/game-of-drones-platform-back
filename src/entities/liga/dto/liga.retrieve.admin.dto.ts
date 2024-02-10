import { ApiProperty } from "@nestjs/swagger";
import { MultilingualtextUpdateDto } from "./../../multilingualtext/dto/multilingualtext.update.dto";

export class LigaRetrieveAdminDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: MultilingualtextUpdateDto;
}
