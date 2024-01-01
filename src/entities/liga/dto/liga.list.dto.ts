import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class LigaListeDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;
}
