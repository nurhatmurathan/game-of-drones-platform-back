import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  iin: string;
  
  @ApiProperty()
  password: string;
}
