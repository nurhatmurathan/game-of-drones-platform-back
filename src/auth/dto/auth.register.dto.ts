import { IsValidToken } from "./../../common/validations/is-valid-token.constraint";
import { IsEmailAlreadyExist } from "./../../common/validations/is-email-exist.constraint";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsString,
    Length,
    MinLength,
    Validate,
    min,
} from "class-validator";

export class AuthRegisterDto {
    @ApiProperty({ example: "1ec61dddb22a33314a50b883a6a53981a6ef9f6a" })
    @IsString()
    @Validate(IsValidToken)
    token: string;

    @ApiProperty({ example: "12345678" })
    @IsString()
    @MinLength(8)
    password: string;
}
