import { ApiProperty } from '@nestjs/swagger';

export class TournamnetCreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    price: number;

    @ApiProperty()
    ligaId: number;

    @ApiProperty()
    routeId: number;
}