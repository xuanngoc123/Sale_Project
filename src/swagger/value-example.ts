import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '../commons/status.code';

export class ExBadRequest {
  @ApiProperty({ default: STATUS.BAD_REQUEST })
  statusCode: number;
  @ApiProperty({ default: 'Bad request' })
  message: string;
}

export class ExUnauthorized {
  @ApiProperty({ default: STATUS.UNAUTHORIZED })
  statusCode: number;
  @ApiProperty({ default: 'Unauthorized' })
  message: string;
}
export class ExForbidden {
  @ApiProperty({ default: STATUS.FORBIDDEN })
  statusCode: number;
  @ApiProperty({ default: 'Forbidden' })
  message: string;
}
export class ExInternalServerError {
  @ApiProperty({ default: STATUS.INTERNAL_SERVER_ERROR })
  statusCode: number;
  @ApiProperty({ default: 'Internal Server Error' })
  message: string;
}
