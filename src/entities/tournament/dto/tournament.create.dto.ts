import { ApiProperty } from '@nestjs/swagger';
import { MultilingualtextDto } from 'src/entities/multilingualtext/dto/multilingualtext.dto';


export class TournamentCreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: MultilingualtextDto;

    @ApiProperty()
    coverDescription: MultilingualtextDto;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    price: number;

    @ApiProperty()
    ligaId: number;

    @ApiProperty()
    routeId: number;
}