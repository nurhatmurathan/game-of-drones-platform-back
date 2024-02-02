import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { TrainingListDto } from "src/entities/training/dto/user/training.list.dto";
import { LigaRetrieveDto } from "../../../liga/dto";
import { RouteRetrieveDto } from "../../../route/dto";
import { TournamentTimeListDtoV2 } from "../../../tournament.time/dto";

export class TrainingStatusDto {
    @ApiProperty({
        examples: ["NotRegistered", "NotChoosenTraining", "ChoosenTraining"],
        example: "'NotRegistered', 'NotChoosenTraining', 'ChoosenTraining'",
    })
    status: "NotRegistered" | "NotChoosenTraining" | "ChoosenTraining";

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

    @ApiProperty({ type: [TournamentTimeListDtoV2] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TournamentTimeListDtoV2)
    tournamentTimes: TournamentTimeListDtoV2[];

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainingStatusDto)
    trainings: TrainingStatusDto;
}
