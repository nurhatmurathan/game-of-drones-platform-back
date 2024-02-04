import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, ValidateNested } from "class-validator";
import { TournamentTimeUsersDto } from "./admin.user.cover.dto";

export class TournamentTimeAdminRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty({ example: Date.now() })
    @IsInt()
    startTime: number;

    @ApiProperty({ type: TournamentTimeUsersDto, isArray: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TournamentTimeUsersDto)
    users: TournamentTimeUsersDto[];
}
