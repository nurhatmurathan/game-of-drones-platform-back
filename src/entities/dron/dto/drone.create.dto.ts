import { ApiProperty } from "@nestjs/swagger";
import { IsString, Validate } from "class-validator";
import { IsDronAlreadyExist } from "../../../common/validations/is-drone-exist.constraint";

export class DroneCreateDto {
    @ApiProperty()
    @IsString()
    @Validate(IsDronAlreadyExist)
    id: string;

    @ApiProperty()
    @IsString()
    name: string;
}
