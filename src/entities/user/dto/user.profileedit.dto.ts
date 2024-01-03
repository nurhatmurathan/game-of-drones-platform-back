import { Liga } from "./../../liga/liga.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsUrl } from "class-validator";

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
