import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, ValidateNested } from "class-validator";
import { UserCoverDto } from "./../../../user/dto/user.cover.dto";

export class TournamentTimeAdminRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty({ example: Date.now() })
    @IsInt()
    startTime: number;

    @ApiProperty({ type: UserCoverDto })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserCoverDto)
    users: UserCoverDto[];
}
