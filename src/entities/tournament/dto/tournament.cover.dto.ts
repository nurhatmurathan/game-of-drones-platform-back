import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";


export class TournamnetCoverDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    startDate: Date;
}
