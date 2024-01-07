import { IsValidCode } from "./../../common/validations/is-valid-code.constraint";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, Length, Validate } from "class-validator";

export class AuthCodeVerifyDto {
    @ApiProperty({ example: "111111" })
    @IsNumberString()
    @Validate(IsValidCode)
    code: string;
}
