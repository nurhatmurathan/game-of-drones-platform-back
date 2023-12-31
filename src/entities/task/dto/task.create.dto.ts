import { MultilingualtextDto } from "./../../multilingualtext/dto/multilingualtext.dto";
import { ApiProperty } from "@nestjs/swagger";

export class TaskCreateDto {
    @ApiProperty()
    maxCount: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    inOneGame: boolean;

    @ApiProperty()
    description: MultilingualtextDto;

    @ApiProperty()
    taskDescription: MultilingualtextDto;

    @ApiProperty()
    reward: string;
}
