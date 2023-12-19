import { ApiProperty } from "@nestjs/swagger";

export class RouteRetrieveDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    length: string;

    @ApiProperty()
    bestTime: number;

    @ApiProperty()
    map: string;
}
