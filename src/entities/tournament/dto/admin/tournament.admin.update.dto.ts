import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { MultilingualtextUpdateDto } from "../../../multilingualtext/dto";
import { TournamentTimeAdminUpdateDto } from "../../../tournament.time/dto";


export class TournamentAdminUpdateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ type: MultilingualtextUpdateDto })
    @ValidateNested()
    @Type(() => MultilingualtextUpdateDto)
    description: MultilingualtextUpdateDto;

    @ApiProperty({ type: MultilingualtextUpdateDto })
    @ValidateNested()
    @Type(() => MultilingualtextUpdateDto)
    coverDescription: MultilingualtextUpdateDto;

    @ApiProperty({ example: Date.now() })
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    @IsInt()
    routeId: number;

    @ApiProperty({ type: [TournamentTimeAdminUpdateDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TournamentTimeAdminUpdateDto)
    tournamentTimes: TournamentTimeAdminUpdateDto[];
}
