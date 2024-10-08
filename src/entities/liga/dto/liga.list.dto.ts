import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class LigaCoverDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
