import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsString, ValidateNested } from "class-validator";
import { MultilingualtextDto } from "src/entities/multilingualtext/dto";

export class TaskAdminRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

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
    @IsInt()
    maxCount: number;

    @ApiProperty()
    @IsString()
    reward: string;
}
