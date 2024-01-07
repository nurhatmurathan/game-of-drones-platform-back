import { ApiProperty } from "@nestjs/swagger";
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
    description: string;

    @ApiProperty({ example: Date.now() })
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    route: RouteRetrieveDto;
}
