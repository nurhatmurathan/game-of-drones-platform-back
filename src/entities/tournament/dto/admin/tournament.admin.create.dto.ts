import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { MultilingualtextDto } from "../../../multilingualtext/dto";
import { TournamentTimeAdminCreateDto } from "../../../tournament.time/dto";


export class TournamentAdminCreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    description: MultilingualtextDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    coverDescription: MultilingualtextDto;

    @ApiProperty({ example: Date.now() })
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    @IsInt()
    routeId: number;

    @ApiProperty({ type: [TournamentTimeAdminCreateDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TournamentTimeAdminCreateDto)
    tournamentTimes: TournamentTimeAdminCreateDto[];
}
