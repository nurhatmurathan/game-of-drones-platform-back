import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UserEmailDto {
    @ApiProperty()
    @IsEmail()
    email: string;
}
