import * as jwt from 'jsonwebtoken';
import { PayloadJwt } from './commons.type';

export function generateActiveToken(payloadJwt: PayloadJwt): string {
  return jwt.sign(
    {
      email: payloadJwt.email,
      role: payloadJwt.role,
      userName: payloadJwt.userName,
    },
    process.env.VERIFY_TOKEN_KEY,
    { expiresIn: '180s' },
  );
}
