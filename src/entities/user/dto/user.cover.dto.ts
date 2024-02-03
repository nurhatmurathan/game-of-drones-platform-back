import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class UserCoverDto {
    @ApiProperty()
    @IsInt()
    id: number;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
}
