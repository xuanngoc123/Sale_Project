import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  statusCode: number;
  @ApiProperty({ default: 'Bad request' })
  message: string;
}

export class NotFoundResponse {
  @ApiProperty({ default: HttpStatus.NOT_FOUND })
  statusCode: number;
  @ApiProperty({ default: 'Not found' })
  message: string;
}

export class UnauthorizedResponse {
  @ApiProperty({ default: HttpStatus.UNAUTHORIZED })
  statusCode: number;
  @ApiProperty({ default: 'Unauthorized' })
  message: string;
}
export class ForbiddenResponse {
  @ApiProperty({ default: HttpStatus.FORBIDDEN })
  statusCode: number;
  @ApiProperty({ default: 'Forbidden' })
  message: string;
}
export class ConflicResponse {
  @ApiProperty({ default: HttpStatus.CONFLICT })
  statusCode: number;
  @ApiProperty({ default: 'Conflic' })
  message: string;
}
export class InternalServerErrorResponse {
  @ApiProperty({ default: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;
  @ApiProperty({ default: 'Internal Server Error' })
  message: string;
}
