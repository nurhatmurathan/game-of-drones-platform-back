import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthEmailVerifyDto {
    @ApiProperty()
    @IsEmail()
    email: string;
}
