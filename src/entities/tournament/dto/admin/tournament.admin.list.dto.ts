import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";
import { MultilingualtextDto } from "../../../multilingualtext/dto";
import { RouteAdminRetrieveDto } from "../../../route/dto";

export class TournamentAdminListDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    description: MultilingualtextDto;

    @ApiProperty({ example: Date.now() })
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    route: RouteAdminRetrieveDto;
}
