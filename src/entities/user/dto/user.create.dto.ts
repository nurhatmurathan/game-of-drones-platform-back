import { ApiProperty } from "@nestjs/swagger";
import { Liga } from "src/entities/liga/liga.entity";

export class UserCreateDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    iin: string;

    @ApiProperty()
    password: string;
}
