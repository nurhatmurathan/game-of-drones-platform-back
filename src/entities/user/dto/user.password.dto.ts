import { ApiProperty } from "@nestjs/swagger";

export class UserPasswordDto {
    @ApiProperty()
    password: string;
}
