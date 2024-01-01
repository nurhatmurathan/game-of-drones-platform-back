import { ApiProperty } from '@nestjs/swagger';
import { MultilingualtextDto } from 'src/entities/multilingualtext/dto/multilingualtext.dto';
import { IsNumber, IsString } from "class-validator";



export class TournamentCreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    description: MultilingualtextDto;

    @ApiProperty()
    coverDescription: MultilingualtextDto;

    @ApiProperty()
    @IsNumber()
    startDate: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    ligaId: number;

    @ApiProperty()
    routeId: number;
}
