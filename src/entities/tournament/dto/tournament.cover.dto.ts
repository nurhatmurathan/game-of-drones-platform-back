import { ApiProperty } from "@nestjs/swagger";

export class TournamnetCoverDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    startDate: Date;
}
