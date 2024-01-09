import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class UserPasswordDto {
    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;
}
