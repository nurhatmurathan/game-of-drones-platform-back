import { ApiProperty } from "@nestjs/swagger";

export class LigaRetrieveDto{
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string
}