import { Liga } from "./../../liga/liga.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class UserProfileEditDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty({ type: Number })
    @IsInt()
    liga: Liga;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    avatar: string;
}
