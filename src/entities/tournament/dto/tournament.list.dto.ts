import { ApiProperty } from "@nestjs/swagger";
import { LigaRetrieveDto } from "../../liga/dto/liga.retrieve.dto";
import { RouteRetrieveDto } from "../../route/dto/route.retrieve.dto";
import { IsDate, IsInt, IsNumber, IsString } from "class-validator";


export class TournamentListDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNumber()
    startDate: number;


    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    liga: LigaRetrieveDto;

    @ApiProperty()
    route: RouteRetrieveDto;
}
