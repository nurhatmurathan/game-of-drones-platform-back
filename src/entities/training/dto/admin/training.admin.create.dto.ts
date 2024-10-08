import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class TrainingAdminCreateDto {
    @ApiProperty({ example: Date.now() })
    @IsInt()
    readonly startTime: number;

    @ApiProperty()
    @IsInt()
    readonly places: number;

    @ApiProperty({ type: Number })
    @IsInt()
    readonly routeId: number;
}
