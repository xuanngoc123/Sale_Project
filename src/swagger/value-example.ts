import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ExBadRequest {
  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  statusCode: number;
  @ApiProperty({ default: 'Bad request' })
  message: string;
}

export class ExUnauthorized {
  @ApiProperty({ default: HttpStatus.UNAUTHORIZED })
  statusCode: number;
  @ApiProperty({ default: 'Unauthorized' })
  message: string;
}
export class ExForbidden {
  @ApiProperty({ default: HttpStatus.FORBIDDEN })
  statusCode: number;
  @ApiProperty({ default: 'Forbidden' })
  message: string;
}
export class ExInternalServerError {
  @ApiProperty({ default: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;
  @ApiProperty({ default: 'Internal Server Error' })
  message: string;
}
