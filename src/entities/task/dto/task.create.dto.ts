import { ApiProperty } from '@nestjs/swagger';
import { MultilingualText } from '../../multilingualtext/multilingualtext.entity';

export class TaskCreateDto {
    @ApiProperty()
    maxCount: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: MultilingualText;
 
    @ApiProperty()
    reward: string;
}