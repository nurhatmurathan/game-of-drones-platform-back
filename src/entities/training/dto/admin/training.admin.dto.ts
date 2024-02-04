import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class TrainingAdminDto {
    @ApiProperty()
    @IsInt()
    readonly id: number;

    @ApiProperty({ example: Date.now() })
    @IsInt()
    readonly startTime: number;

    @ApiProperty()
    @IsInt()
    readonly places: number;

    @ApiProperty()
    @IsInt()
    readonly reserved: number;
}
