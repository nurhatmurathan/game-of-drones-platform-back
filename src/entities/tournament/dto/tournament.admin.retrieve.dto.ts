import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { MultilingualtextDto } from "src/entities/multilingualtext/dto";
import { RouteAdminRetrieveDto } from "src/entities/route/dto";
import { TournamentTimeListDto } from "../../tournament.time/dto/tournament.time.list.dto";


export class TournamentAdminRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    description: MultilingualtextDto

    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    coverDescription: MultilingualtextDto

    @ApiProperty({ example: Date.now() })
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    @ValidateNested()
    @Type(() => RouteAdminRetrieveDto)
    route: RouteAdminRetrieveDto;

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TournamentTimeListDto)
    tournamentTimes: TournamentTimeListDto[];
}
