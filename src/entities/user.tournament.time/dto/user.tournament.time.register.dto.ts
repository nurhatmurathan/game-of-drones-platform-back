import { ApiProperty } from "@nestjs/swagger";

export class UserTournamnetTimeRegisterDto {
    @ApiProperty()
    tournamentId: number;
}
