import { ApiProperty } from "@nestjs/swagger";
import { Liga } from "src/entities/liga/liga.entity";

export class AuthRegisterDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    iin: string;

    @ApiProperty()
    password: string;
}
