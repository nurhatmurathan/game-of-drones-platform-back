import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class DroneUpdateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsBoolean()
    isOnline: boolean;
}
