import * as jwt from 'jsonwebtoken';
import { PayloadUser } from './commons.type';

export function generateActiveToken(payloadUser: PayloadUser) {
  return jwt.sign(
    {
      email: payloadUser.email,
      role: payloadUser.role,
    },
    process.env.VERIFY_TOKEN_KEY,
    { expiresIn: '180s' },
  );
}
