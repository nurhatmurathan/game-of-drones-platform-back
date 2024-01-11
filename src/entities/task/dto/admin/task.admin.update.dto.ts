import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsString, ValidateNested } from "class-validator";
import { MultilingualtextUpdateDto } from "src/entities/multilingualtext/dto";

export class TaskAdminUpdateDto {
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
    @Type(() => MultilingualtextUpdateDto)
    description: MultilingualtextUpdateDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => MultilingualtextUpdateDto)
    taskDescription: MultilingualtextUpdateDto;

    @ApiProperty()
    @IsString()
    reward: string;
}
