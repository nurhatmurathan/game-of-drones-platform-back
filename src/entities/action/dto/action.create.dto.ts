import { ApiProperty } from '@nestjs/swagger';

import { MultilingualtextDto } from '../../multilingualtext/dto/multilingualtext.dto';

export class ActionCreateDto {
    @ApiProperty()
    description: MultilingualtextDto
  
    @ApiProperty()
    time: Date;  

    @ApiProperty()
    userTournamentTime: number;
    
    @ApiProperty()
    task: number;
}