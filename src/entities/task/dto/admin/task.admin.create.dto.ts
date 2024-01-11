import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsString, ValidateNested } from "class-validator";
import { MultilingualtextDto } from "../../../multilingualtext/dto";

export class TaskAdminCreateDto {
    @ApiProperty()
    @IsInt()
    maxCount: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsBoolean()
    inOneGame: boolean;

    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    description: MultilingualtextDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextDto)
    taskDescription: MultilingualtextDto;

    @ApiProperty()
    @IsString()
    reward: string;
}
