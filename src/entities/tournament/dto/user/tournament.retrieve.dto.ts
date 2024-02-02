import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { TrainingListDto } from "src/entities/training/dto/user/training.list.dto";
import { LigaRetrieveDto } from "../../../liga/dto";
import { RouteRetrieveDto } from "../../../route/dto";
import { TournamentTimeListDto } from "../../../tournament.time/dto";

export class TrainingStatusDto {
    @ApiProperty()
    status: string;

    @ApiProperty({ type: [TrainingListDto] })
    @ValidateNested({ each: true })
    @Type(() => TrainingListDto)
    trainingTimes: TrainingListDto[];
}

export class TournamentRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    startDate: number;

    @ApiProperty()
    @IsInt()
    price: number;

    @ApiProperty()
    @ValidateNested()
    @Type(() => LigaRetrieveDto)
    liga: LigaRetrieveDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => RouteRetrieveDto)
    route: RouteRetrieveDto;

    @ApiProperty({ type: [TournamentTimeListDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TournamentTimeListDto)
    tournamentTimes: TournamentTimeListDto[];

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainingStatusDto)
    trainings: TrainingStatusDto;
}
