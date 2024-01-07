import { ApiProperty } from "@nestjs/swagger";
import { MultilingualtextDto } from "src/entities/multilingualtext/dto/multilingualtext.dto";
import { IsInt, IsNumber, IsString } from "class-validator";

export class TournamentCreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    description: MultilingualtextDto;

    @ApiProperty()
    coverDescription: MultilingualtextDto;

    @ApiProperty({ example: Date.now() })
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    @IsInt()
    ligaId: number;

    @ApiProperty()
    @IsInt()
    routeId: number;
}
