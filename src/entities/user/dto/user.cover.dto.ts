import { ApiProperty } from "@nestjs/swagger";

export class UserCoverDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    middleName: string;
    @ApiProperty()
    iin: string;
    @ApiProperty()
    email: string;
}
