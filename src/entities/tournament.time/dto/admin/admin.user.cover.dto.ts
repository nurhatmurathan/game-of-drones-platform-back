import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { UserCoverDto } from "../../../user/dto/";

export class TournamentTimeUsersDto extends UserCoverDto {
    @ApiProperty()
    @IsInt()
    place: number;
}
