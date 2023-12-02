import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  iin: string;

  @ApiProperty()
  password: string;
}

export class UserLoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UserLoginResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UserRefreshDto {
  @ApiProperty()
  refresh: string;
}

export class UserVerifyDto {
  @ApiProperty()
  token: string;
}
