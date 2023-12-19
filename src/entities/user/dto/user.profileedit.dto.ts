import { ApiProperty } from "@nestjs/swagger";
import { Liga } from "src/entities/liga/liga.entity";

export class UserProfileEditDto {
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    middleName: string;

    @ApiProperty({ type: Number })
    liga: Liga;

    @ApiProperty()
    avatar: string;
}
