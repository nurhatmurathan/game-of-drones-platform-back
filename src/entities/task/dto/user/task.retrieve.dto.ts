import { ApiProperty } from "@nestjs/swagger";

export class TaskRetrieveDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    taskDescription: string;

    @ApiProperty()
    maxCount: number;

    @ApiProperty()
    doneCount: number;

    @ApiProperty()
    reward: string;
}
