import { Route } from "./../../route/route.entity";
import { ApiProperty } from "@nestjs/swagger";

export class TrainingCreateDto {
    @ApiProperty()
    readonly startTime: Date;

    @ApiProperty()
    readonly places: number;

    @ApiProperty({ type: Number })
    readonly route: Route;
}
