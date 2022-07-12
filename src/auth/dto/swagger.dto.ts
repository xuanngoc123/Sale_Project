import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class InfoUserLoginDto {
  @ApiProperty()
  userName: string;
}

export class LoginAccessDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty({ type: InfoUserLoginDto })
  @ValidateNested({ each: true })
  @Type(() => InfoUserLoginDto)
  user: InfoUserLoginDto;
}
