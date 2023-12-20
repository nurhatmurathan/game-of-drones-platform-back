import { ApiProperty } from '@nestjs/swagger';


export class TaskListDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    taskDescription: string;
}