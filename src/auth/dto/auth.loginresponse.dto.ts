import { ApiProperty } from "@nestjs/swagger";

export class UserLoginResponseDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
