import { ApiProperty } from "@nestjs/swagger";

export class LigaCreateDto{
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string
}