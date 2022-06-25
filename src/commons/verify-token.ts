import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PayloadUser } from './commons.type';

export function verifyToken(token: string, key: string): PayloadUser | any {
  return jwt.verify(token, key, (err, data: PayloadUser) => {
    if (err) {
      throw new BadRequestException('Token expired');
    } else {
      return data;
    }
  });
}
