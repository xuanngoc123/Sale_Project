import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PayloadJwt } from '../commons/commons.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
    });
  }

  async validate(payload: any): Promise<PayloadJwt> {
    return {
      _id: payload._id,
      email: payload.email,
      userName: payload.userName,
      role: payload.role,
      status: payload.status,
      address: payload.address,
      phoneNumber: payload.phoneNumber,
    };
  }
}
