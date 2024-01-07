import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class AuthCodeVerifyDto {
    @ApiProperty()
    @IsNumberString()
    code: string;
}
