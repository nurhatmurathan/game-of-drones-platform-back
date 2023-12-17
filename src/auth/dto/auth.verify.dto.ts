import { ApiProperty } from "@nestjs/swagger";

export class UserVerifyDto {
    @ApiProperty()
    token: string;
  }