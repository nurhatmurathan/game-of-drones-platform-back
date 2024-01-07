import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Validate } from "class-validator";
import { IsEmailAlreadyExist } from "./../../common/validations/is-email-exist.constraint";

export class AuthEmailVerifyDto {
    @ApiProperty({ example: "example@gmail.com" })
    @IsEmail()
    @Validate(IsEmailAlreadyExist)
    email: string;
}
