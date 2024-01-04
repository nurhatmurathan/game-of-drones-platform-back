import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class LigaListeDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
