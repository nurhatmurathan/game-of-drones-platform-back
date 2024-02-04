import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { MultilingualtextDto } from "../../../multilingualtext/dto";
import { RouteAdminRetrieveDto } from "../../../route/dto";
import { TournamentTimeAdminListDto } from "./../../../tournament.time/dto/admin/tournament.time.admin.list.dto";

export class TournamentAdminRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ type: MultilingualtextDto })
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    description: MultilingualtextDto;

    @ApiProperty({ type: MultilingualtextDto })
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    coverDescription: MultilingualtextDto;

    @ApiProperty({ example: Date.now() })
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty({ type: RouteAdminRetrieveDto })
    @ValidateNested()
    @Type(() => RouteAdminRetrieveDto)
    route: RouteAdminRetrieveDto;

    @ApiProperty({ type: TournamentTimeAdminListDto })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TournamentTimeAdminListDto)
    tournamentTimes: TournamentTimeAdminListDto[];
}
