import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DroneVerifyDto {
    @ApiProperty({
        description: "The access token",
    })
    @IsString()
    token: string;

    @ApiProperty({
        description: "Drone mangoDB ID",
    })
    @IsString()
    id: string;
}
