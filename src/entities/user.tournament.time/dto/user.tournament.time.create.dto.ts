import { ApiProperty } from "@nestjs/swagger";

export class UserTournamnetTimeCreateDto {
    @ApiProperty()
    tournamentTimeId: number;
}
