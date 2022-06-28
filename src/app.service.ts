import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}
}
