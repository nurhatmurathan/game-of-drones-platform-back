import { IsDate, IsInt } from "class-validator";
import { Route } from "./../../route/route.entity";
import { ApiProperty } from "@nestjs/swagger";

export class TrainingCreateDto {
    @ApiProperty()
    @IsDate()
    readonly startTime: Date;

    @ApiProperty()
    @IsInt()
    readonly places: number;

    @ApiProperty({ type: Number })
    readonly route: Route;
}
