import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
export class EmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  username: string;
}
export class PassDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
