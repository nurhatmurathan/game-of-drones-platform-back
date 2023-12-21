import { ApiProperty } from "@nestjs/swagger";

export class TrainingsTournamentTimeDto {
    @ApiProperty()
    readonly tournamentTimeId: number;
}
