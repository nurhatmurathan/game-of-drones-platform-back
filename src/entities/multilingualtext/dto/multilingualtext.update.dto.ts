import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsString } from "class-validator";

export class MultilingualtextUpdateDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    en: string;

    @ApiProperty()
    @IsString()
    ru: string;

    @ApiProperty()
    @IsString()
    kz: string;
}
