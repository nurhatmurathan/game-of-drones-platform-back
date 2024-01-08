import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";
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
    description: MultilingualtextDto

    @ApiProperty()
    coverDescription: MultilingualtextDto

    @ApiProperty()
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    route: RouteAdminRetrieveDto;

    @ApiProperty()
    tournamentTimes: TournamentTimeListDto[];
}
