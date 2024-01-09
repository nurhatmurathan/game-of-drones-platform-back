import { ApiProperty } from "@nestjs/swagger";

export class UserEmailDto {
    @ApiProperty()
    email: string;
}
