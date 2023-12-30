import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class UserRefreshDto {
    @ApiProperty()
    @IsJWT()
    refresh: string;
}
