import { ApiProperty } from "@nestjs/swagger";

import { Type } from "class-transformer";
import { IsInt, ValidateNested } from "class-validator";
import { MultilingualtextDto } from "../../multilingualtext/dto";

export class ActionAdminCreateDto {
    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    description: MultilingualtextDto;

    @ApiProperty()
    @IsInt()
    time: number;

    @ApiProperty()
    @IsInt()
    userTournamentTimeId: number;

    @ApiProperty()
    @IsInt()
    taskId: number;
}
