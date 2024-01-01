import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MultilingualtextDto {
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
