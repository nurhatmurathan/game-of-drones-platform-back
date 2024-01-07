import { IsEmailAlreadyExist } from "./../../common/validations/is-email-exist.constraint";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, Validate } from "class-validator";

export class AuthEmailVerifyDto {
    @ApiProperty({ example: "example@gmail.com" })
    @IsEmail()
    @Validate(IsEmailAlreadyExist)
    email: string;
}
