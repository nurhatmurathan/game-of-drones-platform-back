import { IsIINAlreadyExist } from "./../../common/validations/is-iin-exist.constraint";
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
import { Liga } from "src/entities/liga/liga.entity";
import { isInt8Array } from "util/types";

export class AuthRegisterDto {
    @ApiProperty()
    @IsEmail()
    @Validate(IsEmailAlreadyExist)
    email: string;

    @ApiProperty()
    @IsNumberString()
    @Length(12, 12, { message: "iin must be exactly 12 characters" })
    @Validate(IsIINAlreadyExist)
    iin: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;
}
