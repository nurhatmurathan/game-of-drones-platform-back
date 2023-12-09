import { ApiProperty } from "@nestjs/swagger";

export class MultilingualtextDto{
    @ApiProperty()
    en: string
    
    @ApiProperty()
    ru: string
    
    @ApiProperty()
    kz: string

}