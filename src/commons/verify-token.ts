import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PayloadJwt } from './commons.type';

export function verifyToken(token: string, key: string): PayloadJwt | any {
  return jwt.verify(token, key, (err, data: PayloadJwt) => {
    if (err) {
      throw new BadRequestException('Token expired');
    } else {
      return data;
    }
  });
}
