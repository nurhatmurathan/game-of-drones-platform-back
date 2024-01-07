import { IsDate, IsInt } from "class-validator";
import { Route } from "./../../route/route.entity";
import { ApiProperty } from "@nestjs/swagger";

export class TrainingCreateDto {
    @ApiProperty({ example: Date.now() })
    readonly startTime: number;

    @ApiProperty()
    @IsInt()
    readonly places: number;

    @ApiProperty({ type: Number })
    readonly route: Route;
}
