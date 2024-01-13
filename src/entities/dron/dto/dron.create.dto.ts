import { ApiProperty } from "@nestjs/swagger";
import { IsString, Validate } from "class-validator";
import { IsDronAlreadyExist } from "./../../../common/validations/is-dron-exist.constraint";

export class DronCreateDto {
    @ApiProperty()
    @IsString()
    @Validate(IsDronAlreadyExist)
    id: string;

    @ApiProperty()
    @IsString()
    name: string;
}
