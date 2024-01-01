import { ApiProperty } from "@nestjs/swagger";
import { Liga } from "src/entities/liga/liga.entity";
import { IsEmail, IsString, Matches } from "class-validator";

export class UserCreateDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @Matches('^\d{12}$')
    iin: string;

    @ApiProperty()
    @IsString()
    password: string;
}
