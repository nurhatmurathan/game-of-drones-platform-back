import { ApiProperty } from "@nestjs/swagger";

export class TrainingIdDto {
    @ApiProperty()
    readonly trainingId: number;
}
