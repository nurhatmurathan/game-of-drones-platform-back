import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsUrl } from "class-validator";
import { Liga } from "src/entities/liga/liga.entity";

export class UserProfileEditDto {
    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    middleName: string;

    @ApiProperty({ type: Number })
    @IsInt()
    liga: Liga;

    @ApiProperty()
    @IsUrl()
    avatar: string;
}
