import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class UserProfileEditDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    avatar: string;
}
