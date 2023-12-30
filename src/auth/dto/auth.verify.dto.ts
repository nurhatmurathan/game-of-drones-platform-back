import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class UserVerifyDto {
    @ApiProperty()
    @IsJWT()
    token: string;
}
