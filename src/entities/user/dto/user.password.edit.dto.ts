import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class UserPasswordEditDto {
    @ApiProperty()
    @IsString()
    @MinLength(8)
    oldPassword: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    newPassword: string;
}
