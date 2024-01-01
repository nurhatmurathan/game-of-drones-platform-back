import { ApiProperty } from "@nestjs/swagger";
import { LigaRetrieveDto } from "../../liga/dto/liga.retrieve.dto";
import { RouteRetrieveDto } from "../../route/dto/route.retrieve.dto";
import { TournamentTimeListDto } from "../../tournament.time/dto/tournament.time.list.dto";

export class TournamentListDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    startDate: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    liga: LigaRetrieveDto;

    @ApiProperty()
    route: RouteRetrieveDto;
}
