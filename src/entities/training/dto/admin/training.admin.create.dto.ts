import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Route } from "../../../route/route.entity";

export class TrainingAdminCreateDto {
    @ApiProperty({ example: Date.now() })
    readonly startTime: number;

    @ApiProperty()
    @IsInt()
    readonly places: number;

    @ApiProperty({ type: Number })
    readonly route: Route;
}
