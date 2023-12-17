import { ApiProperty } from '@nestjs/swagger';

export class TournamentListDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string;
  
    @ApiProperty()
    startDate: Date;
  
    @ApiProperty()
    price: number;
}