import { ApiProperty } from "@nestjs/swagger";

export class LigaListeDto{
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string
}