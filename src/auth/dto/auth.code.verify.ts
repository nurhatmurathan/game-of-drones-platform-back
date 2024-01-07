import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, Validate } from "class-validator";
import { IsValidCode } from "./../../common/validations/is-valid-code.constraint";

export class AuthCodeVerifyDto {
    @ApiProperty({ example: "111111" })
    @IsNumberString()
    @Validate(IsValidCode)
    code: string;
}
